import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function MemoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? '#fff' : '#000';
  const secondaryText = isDark ? '#aaa' : '#666';

  return (
    <Animated.View
      entering={SlideInRight.duration(300)}
      exiting={SlideOutLeft.duration(200)}
      style={styles.container}
      sharedTransitionTag={`memo-${id}`}
    >
      <Text style={[styles.title, { color: textColor }]}>Memo {id}</Text>
      <Text style={[styles.content, { color: secondaryText }]}>
        Memo details will be displayed here.
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push(`/memo/edit/${id}` as any)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  content: { fontSize: 16, lineHeight: 24 },
  editButton: {
    backgroundColor: '#1a73e8',
    marginTop: 24,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
