import { Dimensions, Platform, StatusBar } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const statusBarHeight = Platform.select({
    ios: 44,
    android: StatusBar.currentHeight || 24,
    default: 0,
});

export const screenDimensions = Dimensions.get('window');

export const hitSlop = Platform.select({
    ios: { top: 10, bottom: 10, left: 10, right: 10 },
    android: { top: 12, bottom: 12, left: 12, right: 12 },
})

export const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
});
  
  
