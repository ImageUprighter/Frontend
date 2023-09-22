import { useState, useEffect } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPickerResponse
import { styles } from './my_style';
import ImageList from './ImageList';
import KeepAwake from 'react-native-keep-awake';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SystemNavigationBar from 'react-native-system-navigation-bar';

interface ImageListProps {
  navigation: any;
}
const ImageSlideShow: React.FC<ImageListProps> = ({ navigation }) => {

 const [selectedFolderUris, setSelectedFolderUris] = useState<string>();
  const storeKey = '@directory_path'

  useEffect(() => {
    (async () => {
      SystemNavigationBar.navigationHide();

      const data = retrieveData();
      if (typeof data === 'string') {
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
      const result = await DocumentPicker.pickDirectory({});
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


  return (
    selectedFolderUris ? <SafeAreaView style={styles.sectionContainer}>
      <KeepAwake />
      <ImageList directoryPath={selectedFolderUris} navigation={navigation} />
    </SafeAreaView> :

      <SafeAreaView style={styles.HomePageContainer}>
        <Text style={styles.sectionTitle}>Choose a directory</Text>
        <Button title="Pick Folder" onPress={pickFolder} />
      </SafeAreaView>
  );
}

export default ImageSlideShow;