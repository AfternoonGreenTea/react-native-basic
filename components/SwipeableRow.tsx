import * as Haptics from 'expo-haptics';
import { useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  onDelete: () => void;
}

export function SwipeableRow({ children, onDelete }: Props) {
  const swipeableRef = useRef<SwipeableMethods>(null);

  const renderRightActions = (
    _progress: SharedValue<number>,
    translation: SharedValue<number>,
  ) => {
    return <DeleteAction translation={translation} />;
  };

  const handleSwipeOpen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDelete();
    swipeableRef.current?.close();
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipeOpen}
      rightThreshold={80}
    >
      {children}
    </ReanimatedSwipeable>
  );
}

function DeleteAction({ translation }: { translation: SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value + 80 }],
  }));

  return (
    <Animated.View style={[styles.deleteAction, animatedStyle]}>
      <Text style={styles.deleteText}>Delete</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
  },
  deleteText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
