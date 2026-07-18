import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { BarcodeScanningResult, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function BarcodeScanner({ onScanned }: { onScanned: (data: string) => void }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) return null;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>カメラの許可が必要です</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>許可する</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = (result: BarcodeScanningResult) => {
        if (scanned) return;
        setScanned(true);
        onScanned(result.data);
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'],
                }}
                onBarcodeScanned={handleBarCodeScanned}
            />
            {scanned && (
                <TouchableOpacity
                onPress={() => setScanned(false)}
                style={styles.rescanButton}
                >
                <Text style={styles.buttonText}>もう一度スキャン</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    camera: { width: '100%', height: 300 },
    message: { fontSize: 16, color: '#333', marginBottom: 16 },
    button: {
      backgroundColor: '#1a73e8',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    rescanButton: {
      backgroundColor: '#1a73e8',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 16,
    },
    buttonText: { color: '#fff', fontWeight: '600' },
});
  
  
