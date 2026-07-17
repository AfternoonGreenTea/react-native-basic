import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { useMemoStore } from '../store/useMemoStore';

export function useNetworkStatus() {
    const { setOnline, isOnline } = useMemoStore();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const online = !!(state.isConnected && state.isInternetReachable);
            setOnline(state.isConnected ?? false);
        });

        return () => unsubscribe();
    }, [setOnline]);

    return { isOnline };
}