import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_LOCATION_TASK = 'background-location-task';

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
    if (error) {
        console.error('Background location error:', error);
        return;
    }

    if (data) {
        const { locations } = data as { locations: Location.LocationObject[] };
        const latest = locations[0];
        console.log('Background location:', latest.coords);
    }
})

export async function startBackgroundLocationTracking() {
    const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
    
    if (foregroundStatus !== 'granted') return false;

    const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
    
    if (backgroundStatus !== 'granted') return false;

    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 50,
        deferredUpdatesInterval: 60000,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
            notificationTitle: 'MemoSync',
            notificationBody: '位置情報を追跡中',
            notificationColor: '#1a73e8',
        },
    })

    return true;
}

export async function stopBackgroundLocationTracking() {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_LOCATION_TASK
    );
    if (isRegistered) {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
    }    
}

