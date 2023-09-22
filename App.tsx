// import { useState, useEffect } from 'react';
// import { Button, SafeAreaView, Text, StatusBar, Platform } from 'react-native';
// import DocumentPicker from 'react-native-document-picker'; // Import DocumentPickerResponse
// import { PERMISSIONS, request } from 'react-native-permissions';
// import { styles } from './my_style';
// import ImageList from './ImageList';
// import KeepAwake from 'react-native-keep-awake';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Entypo } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import SystemNavigationBar from 'react-native-system-navigation-bar';

// export default function App(): JSX.Element {
//   const [selectedFolderUris, setSelectedFolderUris] = useState<string>();
//   const storeKey = '@directory_path'

//   useEffect(() => {
//     (async () => {

//       // const storagePermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);


//       SystemNavigationBar.navigationHide();

//       const data = retrieveData();
//       if (typeof data === 'string') {
//         setSelectedFolderUris(data);
//       }
//     })();
//   }, []);

//   const retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem(storeKey);
//       if (value !== null) {
//         // We have data!!
//         console.log(value);
//         return value;
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//     return null;

//   }

//   const storeData = async (value: string) => {
//     try {
//       await AsyncStorage.setItem(storeKey, value)
//     } catch (e) {
//       // saving error
//     }
//   }

//   const pickFolder = async () => {
//     try {
//       const result = await DocumentPicker.pickDirectory({});
//       if (result != null) {
//         // /storage/emulated/0/DCIM/Camera
//         const outputString = '/storage/emulated/0/' + decodeURIComponent(result.uri).split("primary")[1].split(':')[1]
//         setSelectedFolderUris(outputString);
//         storeData(outputString)
//       }
//     } catch (error) {
//       console.error('Error picking folder: ', error);
//     }
//   };


//   return (
//     selectedFolderUris ? <SafeAreaView style={styles.sectionContainer}>
//       <KeepAwake />
//       <ImageList directoryPath={selectedFolderUris} />
//     </SafeAreaView> :

//       <SafeAreaView style={styles.sectionContainer}>
//         <KeepAwake />
//         <Text>{selectedFolderUris}</Text>
//         <Button title="Pick Folder" onPress={pickFolder} />
//       </SafeAreaView>
//   );
// }




import { useState, useEffect } from 'react';
import { Button, SafeAreaView, Text, StatusBar, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPickerResponse
import { PERMISSIONS, request } from 'react-native-permissions';
import { styles } from './my_style';
import HomePage from './HomePage';
import Settings from './Settings';
import ImageSlideShow from './ImageSlideShow';
import KeepAwake from 'react-native-keep-awake';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  
  useEffect(() => {
    (async () => {

      // const storagePermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      SystemNavigationBar.navigationHide();
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ImageSlideShow" component={ImageSlideShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// import { useState, useEffect } from 'react';
// import { Button, SafeAreaView, Text, StatusBar, Platform } from 'react-native';
// import DocumentPicker from 'react-native-document-picker'; // Import DocumentPickerResponse
// import { PERMISSIONS, request } from 'react-native-permissions';
// import { styles } from './my_style';
// import HomePage from './HomePage';
// import Settings from './Settings';
// import ImageSlideShow from './ImageSlideShow';
// import KeepAwake from 'react-native-keep-awake';
// import SystemNavigationBar from 'react-native-system-navigation-bar';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// export default function App(): JSX.Element {
//   const [selectedFolderUris, setSelectedFolderUris] = useState<string>();
//   const storeKey = '@directory_path'

//   useEffect(() => {
//     (async () => {

//       // const storagePermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//       SystemNavigationBar.navigationHide();
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//         <Drawer.Screen name="Home" component={HomePage} />
//         <Drawer.Screen name="Settings" component={Settings} />
//         <Drawer.Screen name="ImageSlideShow" component={ImageSlideShow} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
