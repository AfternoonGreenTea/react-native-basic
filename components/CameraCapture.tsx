import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export function CameraCapture({ onCapture }: { onCapture: (uri: string) => void }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const [preview, setPreview] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission?.granted) {
        requestPermission();
        return null;
    }

    const takePicture = async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: false,
        });
        if (photo) {
          setPreview(photo.uri);
        }
    };

    const confirmPhoto = () => {
        if (preview) {
          onCapture(preview);
          setPreview(null);
        }
    };

    if (preview) {
        return (
          <View style={styles.container}>
            <Image source={{ uri: preview }} style={styles.preview} />
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setPreview(null)} style={styles.actionBtn}>
                <Ionicons name="close" size={32} color="#ff3b30" />
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmPhoto} style={styles.actionBtn}>
                <Ionicons name="checkmark" size={32} color="#34c759" />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    
      return (
        <View style={styles.container}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
              >
                <Ionicons name="camera-reverse" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePicture} style={styles.captureBtn} />
            </View>
          </CameraView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    preview: { flex: 1, resizeMode: 'contain' },
    controls: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingBottom: 40,
    },
    captureBtn: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: '#fff',
      borderWidth: 4,
      borderColor: '#ddd',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    actionBtn: { padding: 16 },
});
