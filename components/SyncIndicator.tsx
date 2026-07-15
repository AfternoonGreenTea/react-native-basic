import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function SyncIndicator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1c1c1e' : '#f5f5f5' }]}>
      <Ionicons name="cloud-done-outline" size={14} color="#4caf50" />
      <Text style={[styles.text, { color: isDark ? '#aaa' : '#666' }]}>Synced</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  text: { fontSize: 12 },
});
