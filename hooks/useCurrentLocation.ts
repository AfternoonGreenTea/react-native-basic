import * as Location from 'expo-location';
import { useState } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

export function useCurrentLocation() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const requestLocation = async () => {
        setLoading(true);
        setError(null);

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Location permission not granted');
            setLoading(false);
            return;
        }

        try {
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                accuracy: currentLocation.coords.accuracy,
            });
        } catch (err) {
            setError('Failed to get location');
        } finally {
            setLoading(false);
        }
    }

    return { location, error, loading, requestLocation };
}
