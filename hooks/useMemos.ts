import { useState, useCallback } from 'react';
import type { Memo } from '../components/MemoCard';

const SAMPLE_MEMOS: Memo[] = [
  { id: '1', title: 'Shopping List', content: 'Milk, eggs, bread, vegetables', updatedAt: '2025-07-15' },
  { id: '2', title: 'Meeting Notes', content: 'Project progress review, next sprint planning', updatedAt: '2025-07-14' },
  { id: '3', title: 'Ideas', content: 'Consider new features for the app', updatedAt: '2025-07-13' },
];

export function useMemos() {
  const [memos, setMemos] = useState<Memo[]>(SAMPLE_MEMOS);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setMemos(SAMPLE_MEMOS);
      setIsLoading(false);
    }, 500);
  }, []);

  const deleteMemo = useCallback((id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return { memos, isLoading, refetch, deleteMemo };
}
