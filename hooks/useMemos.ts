import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { useMemoStore } from '../store/useMemoStore';

export function useMemos() {
  const queryClient = useQueryClient();
  const { memos, addMemo, updateMemo, removeMemo, isOnline } = useMemoStore();

  const { isLoading, refetch } = useQuery({
    queryKey: ['memos'],
    queryFn: async () => {
      const data = await api.getMemos();
      useMemoStore.setMemos(data);
      return data;
    },
    enabled: isOnline,
    initialData: memos,
  });

  const createMutation = useMutation({
    mutationFn: async (params: { title: string; content: string }) => {
      const memo = {
        id: `memo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        ...params,
        category: 'general',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        synced: isOnline,
      };
      addMemo(memo);
      if (isOnline) await api.createMemo(memo);
      return memo;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['memos'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      removeMemo(id);
      if (isOnline) await api.deleteMemo(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['memos'] }),
  });

  return {
    memos,
    isLoading,
    refetch,
    createMemo: createMutation.mutate,
    deleteMemo: deleteMutation.mutate,
  }
}
