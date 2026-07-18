import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef } from 'react';

const SHAKE_THRESHOLD = 1.5;
const SHAKE_TIMEOUT = 1000;

export function useShakeDetection(onShake: () => void) {
    const lastShakeRef = useRef(0);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const magnitude = Math.sqrt(x * x + y * y + z * z);

            if (magnitude > SHAKE_THRESHOLD) {
                const now = Date.now();
                if (now - lastShakeRef.current > SHAKE_TIMEOUT) {
                    lastShakeRef.current = now;
                    onShake();
                }
            }
        })

        return () => subscription.remove();
    }, [onShake])
}
