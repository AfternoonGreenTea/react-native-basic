import * as ImagePicker from 'expo-image-picker';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

interface Memo {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    synced: boolean;
}

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        }
    })

    if (!res.ok) {
        throw new ApiError(res.status, await res.text());
    }

    return res.json();
}

export const api = {
    getMemos: () => request<Memo[]>('/memos'),

    getMemo: (id: string) => request<Memo>(`/memo/${id}`),

    createMemo: (data: Partial<Memo>) =>
        request<Memo>('/memos', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateMemo: (id: string, data: Partial<Memo>) =>
        request<Memo>(`/memos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    deleteMemo: (id: string) =>
        request<void>(`/memos/${id}`, {
            method: 'DELETE',
        }),
}

export async function pickImage(): Promise<string | null> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return null;

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: false,
    });

    if (result.canceled) return null;
    return result.assets?.[0]?.uri;
}

export async function takePhoto(): Promise<string | null> {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return null;

    const result = await ImagePicker.requestCameraPermissionsAsync({
        allowsEditing: true,
        quality: 0.8,
    });

    if (result.canceled) return null;
    return result.assets?.[0]?.uri;
}
