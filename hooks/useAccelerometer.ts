import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import { useEffect, useState } from 'react';

export function useAccelerometer(updateInterval = 100) {
    const [data, setData] = useState<AccelerometerMeasurement | null>({ x: 0, y: 0, z: 0 });
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        Accelerometer.isAvailableAsync().then(setIsAvailable);
    }, []);

    useEffect(() => {
        if (!isAvailable) return;

        Accelerometer.setUpdateIntervalAsync(updateInterval);

        const subscription = Accelerometer.addListener(setData);

        return () => subscription.remove();
    }, [isAvailable, updateInterval]);

    return { data, isAvailable };
}
