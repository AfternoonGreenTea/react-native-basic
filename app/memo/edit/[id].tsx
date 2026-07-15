import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MemoEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [title, setTitle] = useState(`Memo ${id}`);
  const [content, setContent] = useState('');

  const handleSave = () => {
    // TODO: call updateMemo from useMemos
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          style={[
            styles.titleInput,
            { color: isDark ? '#fff' : '#000', borderBottomColor: isDark ? '#333' : '#e0e0e0' },
          ]}
          placeholder="Title"
          placeholderTextColor={isDark ? '#888' : '#999'}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.contentInput, { color: isDark ? '#fff' : '#000' }]}
          placeholder="Enter memo content..."
          placeholderTextColor={isDark ? '#888' : '#999'}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16 },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 200,
  },
  saveButton: {
    backgroundColor: '#1a73e8',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
