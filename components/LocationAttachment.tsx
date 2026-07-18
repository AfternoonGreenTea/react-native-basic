import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

interface Props {
    onLocationAttached: (lat: number, lng: number) => void;
}

export function LocationAttachment({ onLocationAttached }: Props) {
    const { location, error, loading, requestLocation } = useCurrentLocation();

    const handleAttach = async () => {
        await requestLocation();
        if (location) {
            onLocationAttached(location.latitude, location.longitude);
        }
    }

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={handleAttach} disabled={loading} style={styles.button}>
            <Ionicons name="location-outline" size={20} color="#1a73e8" />
            <Text style={styles.buttonText}>
            {loading ? 'Getting location...' : 'Attach location'}
            </Text>
        </TouchableOpacity>
        {location && (
            <Text style={styles.coords}>
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </Text>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { padding: 8 },
    button: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    buttonText: { color: '#1a73e8', fontSize: 14 },
    coords: { fontSize: 12, color: '#666', marginTop: 4 },
    error: { fontSize: 12, color: '#ff3b30', marginTop: 4 },
});
