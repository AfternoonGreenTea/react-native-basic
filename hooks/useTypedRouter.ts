import { useRouter } from 'expo-router';

export function useTypedRouter() {
  const router = useRouter();

  return {
    goToMemo: (id: string) => router.push(`/memo/${id}` as any),
    goToEdit: (id: string) => router.push(`/memo/edit/${id}` as any),
    goToNewMemo: () => router.push('/(tabs)/new' as any),
    goBack: () => router.back(),
  };
}
