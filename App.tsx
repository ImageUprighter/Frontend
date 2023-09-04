import { useState, useEffect } from 'react';
import { Button, SafeAreaView, Text, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { StoragePermissions, CameraPermissions } from './Permissions'
import FilePickerManager from 'react-native-file-picker';
import { styles } from './my_style'
export default function App(): JSX.Element {
  const [directory, setDirectory] = useState('');
  const [storageGranted, setStorageGranted] = useState('');
  const [cameraGranted, setCameraGranted] = useState('');

  useEffect(() => {
    (async () => {
      // setStorageGranted(await StoragePermissions())
      // setCameraGranted(await CameraPermissions())
    })()
  }, []);

  const pickFolder = async() =>{
    try {
      const cemeraPremission = await CameraPermissions()
      setCameraGranted(cemeraPremission)
      const storagePremission = await StoragePermissions()
      setStorageGranted(storagePremission)

      if (storageGranted === PermissionsAndroid.RESULTS.GRANTED || cameraGranted === PermissionsAndroid.RESULTS.GRANTED) {
        FilePickerManager.showFilePicker({}, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled file picker');
          } else if (response.error) {
            console.log('File picker error:', response.error);
          } else {
            console.log('Selected folder:', response.path);
            setDirectory(response.path);
          }
        });
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error("error: ", error);
    }
  }


  // Call this function to trigger folder selection
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text>Chosen Directory: {directory}</Text>
      <Button title="Pick Folder" onPress={pickFolder} />
    </SafeAreaView>
  );

}


// import React from 'react';
// import { SafeAreaView, View, Text, StyleSheet, PermissionsAndroid, TouchableOpacity, Platform, Alert } from 'react-native';
// const App = () => {
//   const proceed = () => {
//     Alert.alert('Access to Gallery has been granted');
//   };
//   const permissions = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs access to your camera',
//           buttonPositive: 'OK',
//           buttonNegative: 'Cancel',
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         proceed();
//       } else {
//         Alert.alert('Access to Gallery Denied');
//       }
//     } else {
//       proceed();
//     }
//   };
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Text
//           style={{
//             fontSize: 18,
//             textAlign: 'center',
//             color: '#7a1229'
//           }}>
//         </Text>
//         <Text
//           style={{
//             fontSize: 20,
//             textAlign: 'center',
//             color: '#0d8028'
//           }}>
//           React Permission Example
//         </Text>
//         <View style={styles.container}>
//           <TouchableOpacity
//             style={styles.buttonStyle}
//             onPress={permissions}>
//             <Text style={styles.textStyle}>
//               Click to Grant Gallery Permission
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <Text
//           style={{
//             fontSize: 20,
//             textAlign: 'center',
//             color: '#185ea3'
//           }}>
//           Gallery Permission Asked
//           {'\n'}
//           .........................
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f71b',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   textStyle: {
//     fontSize: 20,
//     color: '#f8fc83',
//   },
//   buttonStyle: {
//     alignItems: 'center',
//     backgroundColor: '#a30d1c',
//     padding: 50,
//   },
// });
// export default App;