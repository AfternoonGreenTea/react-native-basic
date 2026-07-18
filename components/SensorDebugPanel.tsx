import { StyleSheet, Text, View } from 'react-native';
import { useAccelerometer } from '../hooks/useAccelerometer';
import { useGyroscope } from '../hooks/useGyroscope';

export function SensorDebugPanel() {
    const { data: accel, isAvailable: accelAvailable } = useAccelerometer(200);
    const { data: gyro, isAvailable: gyroAvailable } = useGyroscope(200);

    return (
        <View style={styles.panel}>
            <Text style={styles.title}>センサーデータ</Text>

            <Text style={styles.label}>加速度計:</Text>
            {accelAvailable ? (
                <Text style={styles.value}>
                x: {accel.x.toFixed(3)} | y: {accel.y.toFixed(3)} | z: {accel.z.toFixed(3)}
                </Text>
            ) : (
                <Text style={styles.unavailable}>利用不可</Text>
            )}

            <Text style={styles.label}>ジャイロスコープ:</Text>
            {gyroAvailable ? (
                <Text style={styles.value}>
                x: {gyro.x.toFixed(3)} | y: {gyro.y.toFixed(3)} | z: {gyro.z.toFixed(3)}
                </Text>
            ) : (
                <Text style={styles.unavailable}>利用不可</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    panel: { padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8, margin: 16 },
    title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
    label: { fontSize: 13, fontWeight: '600', color: '#555', marginTop: 8 },
    value: { fontSize: 12, fontFamily: 'monospace', color: '#333' },
    unavailable: { fontSize: 12, color: '#999', fontStyle: 'italic' },
});
