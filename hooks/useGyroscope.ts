import { Gyroscope, GyroscopeMeasurement } from 'expo-sensors';
import { useEffect, useState } from 'react';

export function useGyroscope(updateInterval = 100) {
    const [data, setData] = useState<GyroscopeMeasurement>({ x: 0, y: 0, z: 0 });
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        Gyroscope.isAvailableAsync().then(setIsAvailable);
    }, []);

    useEffect(() => {
        if (!isAvailable) return;

        Gyroscope.setUpdateIntervalAsync(updateInterval);

        const subscription = Gyroscope.addListener(setData);

        return () => subscription.remove();
    }, [isAvailable, updateInterval]);

    return { data, isAvailable };
}
