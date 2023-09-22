import { PermissionsAndroid, Platform, Alert } from 'react-native';

const proceed = () => {
    Alert.alert('Access to Gallery has been granted');
};

export const CameraPermissions = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'App needs access to your camera',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // proceed()
            return granted;
        } else {
            Alert.alert('Access to Gallery Denied');
            return granted;
        }
    } else {
        return PermissionsAndroid.RESULTS.GRANTED;
    }
};


export const StoragePermissions = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Read External Storage Permission',
                message: 'App needs access to your Read External Storage',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );
        console.log("granted:   ", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            proceed()
            return granted;
        } else {
            Alert.alert('Access to Read External Storage Denied');
            return granted;
        }
    } else {
        return PermissionsAndroid.RESULTS.GRANTED;
    }
};
