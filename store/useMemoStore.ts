import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface Memo {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    synced: boolean;  
}

interface PendingAction {
    id: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    data: Partial<Memo>;
    timestamp: number;
}

interface MemoState {
    memos: Memo[];
    pendingActions: PendingAction[];
    isOnline: boolean;
    isSyncing: boolean;
    setMemos: (memos: Memo[]) => void;
    addMemo: (memo: Memo) => void;
    updateMemo: (id: string, updates: Partial<Memo>) => void;
    removeMemo: (id: string) => void;
    addPendingAction: (action: PendingAction) => void;
    clearPendingActions: (action: PendingAction) => void;
    setOnline: (online:boolean) => void;
    setSyncing: (syncing:boolean) => void;
    hydrate: () => Promise<void>;
    persist: () => Promise<void>;
}

export const useMemoStore = create<MemoState>((set, get) => ({
    memos: [],
    pendingActions: [],
    isOnline: false,
    isSyncing: false,

    setMemos: (memos) => {
        set({ memos });
        get().persist();
    },

    addMemo: (memo) => {
        set((state) => ({ memos: [memo, ...state.memos] }));
        get().addPendingAction({
            id: `pending-${Date.now()}`,
            action: 'CREATE',
            data: memo,
            timestamp: Date.now(),
        });
        get().persist();
    },

    updateMemo: (id, updates) => {
        set((state) => ({
            memos: state.memos.map((m) =>
                m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString(), synced: false } : m
            )
        }));
        get().addPendingAction({
            id: `pending-${Date.now()}`,
            action: 'UPDATE',
            data: { id, ...updates },
            timestamp: Date.now(),
        })
        get().persist();
    },

    removeMemo: (id) => {
        set((state) => ({
            memos: state.memos.filter((m) => m.id !== id),
        }));
        get().addPendingAction({
            id: `pending-${Date.now()}`,
            action: 'DELETE',
            data: { id },
            timestamp: Date.now(),
        });
        get().persist();
    },

    addPendingAction: (action) => {
        set((state) => ({ pendingActions: [...state.pendingActions, action] }));
    },

    clearPendingActions: (ids) => {
        set((state) => ({
            pendingActions: state.pendingActions.filter((a) => !ids.includes(a.id)),
        }))
    },

    setOnline: (online) => set({ isOnline: online }),
    setSyncing: (syncing) => set({ isSyncing: syncing }),

    hydrate: async () => {
        try {
            const stored = await AsyncStorage.getItem('memo-store');
            if (stored) {
                const { memos, pendingActions } = JSON.parse(stored);
                set({ memos: memos || [], pendingActions: pendingActions || [] });
            }
        } catch (error) {
            console.error('Error hydrating memo store:', error);
        }
    },

    persist: async () => {
        try {
            const { memos, pendingActions } = get()
            await AsyncStorage.setItem('memo-store', JSON.stringify({ memos, pendingActions }));
        } catch (error) {
            console.error('Error persisting memo store:', error);
        }
    }
}))
