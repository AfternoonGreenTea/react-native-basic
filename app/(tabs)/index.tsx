import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MemoList } from '../../components/MemoList';
import { FABButton } from '../../components/FABButton';
import { SyncIndicator } from '../../components/SyncIndicator';
import { useMemos } from '../../hooks/useMemos';

export default function MemoListScreen() {
  const router = useRouter();
  const { memos, isLoading, refetch, deleteMemo } = useMemos();

  return (
    <View style={styles.container}>
      <SyncIndicator />
      <MemoList
        memos={memos}
        isLoading={isLoading}
        onRefresh={refetch}
        onPress={(id: string) => router.push(`/memo/${id}` as any)}
        onDelete={deleteMemo}
      />
      <FABButton onPress={() => router.push('/(tabs)/new' as any)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
