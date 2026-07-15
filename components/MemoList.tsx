import { FlatList, RefreshControl, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { MemoCard, type Memo } from './MemoCard';

type Props = {
  memos: Memo[];
  isLoading: boolean;
  onRefresh: () => void;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
};

export function MemoList({ memos, isLoading, onRefresh, onPress, onDelete }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (memos.length === 0 && !isLoading) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyText, { color: isDark ? '#aaa' : '#666' }]}>
          No memos
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={memos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SwipeableRow onDelete={() => onDelete(item.id)}>
          <MemoCard memo={item} onPress={() => onPress(item.id)} />
        </SwipeableRow>
      )}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  separator: { height: 8 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#333' },
  emptySubtext: { fontSize: 14, color: '#666', marginTop: 8 },
});
