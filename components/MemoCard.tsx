import { Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';

export type Memo = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

type Props = {
  memo: Memo;
  onPress: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function MemoCard({ memo, onPress }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity onPress={() => onPress(memo.id)} activeOpacity={0.7}>
      <Animated.View
        sharedTransitionTag={`memo-${memo.id}`}
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#2c2c2e' : '#fff',
            borderColor: isDark ? '#3a3a3c' : '#e0e0e0',
          },
        ]}
      >
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          {memo.title}
        </Text>
        <Text
          style={[styles.content, { color: isDark ? '#aaa' : '#666' }]}
          numberOfLines={2}
        >
          {memo.content}
        </Text>
        <Text style={[styles.date, { color: isDark ? '#888' : '#999' }]}>
          {memo.updatedAt}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: { fontSize: 17, fontWeight: '600', marginBottom: 4 },
  content: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  date: { fontSize: 12 },
});
