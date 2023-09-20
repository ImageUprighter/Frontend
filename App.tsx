import { useState, useEffect } from 'react';
import { Button, SafeAreaView, Text, Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'; // Import DocumentPickerResponse
import { PERMISSIONS, request } from 'react-native-permissions';
import { styles } from './my_style';
import ImageList from './ImageList';
import RNFS from 'react-native-fs';
import KeepAwake from 'react-native-keep-awake';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function App(): JSX.Element {
  const [selectedFolderUris, setSelectedFolderUris] = useState<string>();
  const storeKey = '@directory_path'

  useEffect(() => {
    (async () => {
      // const storagePermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      const data = retrieveData();
      if (typeof data === 'string' ) {
        setSelectedFolderUris(data);
      }
    })();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(storeKey);
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value;
      }
     } catch (error) {
      // Error retrieving data
    }
    return null;

  }

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem(storeKey, value)
    } catch (e) {
      // saving error
    }
  }

  const pickFolder = async () => {
    try {
      const result = await DocumentPicker.pickDirectory({
      });
      if (result != null) {
        // /storage/emulated/0/DCIM/Camera
        const outputString = '/storage/emulated/0/' + decodeURIComponent(result.uri).split("primary")[1].split(':')[1]
        setSelectedFolderUris(outputString);
        storeData(outputString)
      }
    } catch (error) {
      console.error('Error picking folder: ', error);
    }
  };

  async function listImagesInFolder(folderPath: string) {
    try {
      const folderContents = await RNFS.readDir(folderPath);

      // Filter the folder contents to get only image files (you can adjust the filter based on your needs).
      const imageFiles = folderContents.filter((item) =>
        item.isFile() && item.name.endsWith('.jpg') // or other image formats
      );

      // Now, `imageFiles` contains a list of image file objects in the folder.
      console.log('Image Files:', imageFiles);
    } catch (error) {
      console.error('Error reading folder:', error);
    }
  }

  // const pickFolder = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     if (result) {
  //       console.log(
  //         result[0].uri,"\n",
  //         result[0].type, "\n",// mime type
  //         result[0].name,"\n",
  //         result[0].size,"\n"
  //       );

  //       // Extract the folder path from the selected file's URI.
  //       const folderPath = result[0].uri.substring(0, result[0].uri.lastIndexOf('/'));
  //         console.log("folderPath:    ", folderPath)
  //       // Now, you can use the `folderPath` to list all the image files within this folder.
  //       listImagesInFolder(folderPath);
  //     }
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker
  //     } else {
  //       throw err;
  //     }
  //   }
  // }


  return (
    <SafeAreaView style={styles.sectionContainer}>
      <KeepAwake />
      <Text>{selectedFolderUris}</Text>
      {selectedFolderUris ? <ImageList directoryPath={selectedFolderUris} />
        : null}
      <Button title="Pick Folder" onPress={pickFolder} />
    </SafeAreaView>
  );
}
