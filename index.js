/**
 * @format
 */

import { AppRegistry
    // , DeviceEventEmitter, NativeEventEmitter, Platform 
} from 'react-native';
import App from './App.tsx';
import { name as appName } from './app.json';

// const PowerReceiver = new NativeEventEmitter(DeviceEventEmitter);

// // Android: Listen for power connected
// if (Platform.OS === 'android') {
//     PowerReceiver.addListener('android.intent.action.ACTION_POWER_CONNECTED', () => {
//         // Start your React Native app here
//     });
// }

AppRegistry.registerComponent(appName, () => App);
