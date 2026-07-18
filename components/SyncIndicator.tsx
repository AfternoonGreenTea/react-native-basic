import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useMemoStore } from '../store/useMemoStore';

export function SyncIndicator() {
  const { isOnline, isSyncing, pendingActions } = useMemoStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSyncing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isSyncing, pulseAnim]);

  if (isOnline && pendingActions.length === 0) return null;


  return (
    <View style={[styles.container, !isOnline && styles.offline]}>
      <Animated.View style={{ opacity: pulseAnim }}>
        <Ionicons
          name={isOnline ? 'sync' : 'cloud-offline'}
          size={16}
          color={isOnline ? '#1a73e8' : '#ff9800'}
        />
      </Animated.View>
      <Text style={styles.text}>
        {!isOnline
          ? 'オフライン'
          : isSyncing
          ? '同期中...'
          : `未同期: ${pendingActions.length}件`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e3f2fd',
    gap: 6,
  },
  offline: { backgroundColor: '#fff3e0' },
  text: { fontSize: 12, color: '#333' },
});
