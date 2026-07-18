import { useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { useMemoStore } from '../store/useMemoStore';
import { useNetworkStatus } from './useNetworkStatus';

export function useOfflineSync() {
    const { isOnline } = useNetworkStatus();
    const { pendingActions, clearPendingActions, setSyncing, isSyncing } = useMemoStore();

    const syncPendingActions = useCallback(async () => {
        if (pendingActions.length === 0 || isSyncing) return;
    
        setSyncing(true);
        const successIds: string[] = [];
    
        for (const action of pendingActions) {
          try {
            switch (action.action) {
              case 'CREATE':
                await api.createMemo(action.data);
                break;
              case 'UPDATE':
                await api.updateMemo(action.data.id!, action.data);
                break;
              case 'DELETE':
                await api.deleteMemo(action.data.id!);
                break;
            }
            successIds.push(action.id);
          } catch (error: any) {
            if (error.status === 409) {
              // Last-write-wins: サーバー版を取得してローカルを上書き
              const serverMemo = await api.getMemo(action.data.id!);
              useMemoStore.getState().updateMemo(action.data.id!, serverMemo);
              successIds.push(action.id);
            } else if (error.status >= 400 && error.status < 500) {
              successIds.push(action.id);
            }
            // 5xx エラーは次回リトライのため残す
          }
        }
    
        if (successIds.length > 0) {
          clearPendingActions(successIds);
        }
        setSyncing(false);
    }, [pendingActions, isSyncing, setSyncing, clearPendingActions]);

    useEffect(() => {
        if (isOnline && pendingActions.length > 0) {
            syncPendingActions();
        }
    }, [isOnline, syncPendingActions]);

    return { isSyncing };
}
