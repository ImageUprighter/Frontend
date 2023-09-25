import { useEffect } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { styles } from '../styles/app.style';
import ImageList from './ImageList';
import KeepAwake from 'react-native-keep-awake';
import Sidebar from './Sidebar';
import { imageSliderStore } from '../stores/ImageSlider.store';
import { observer } from 'mobx-react';


interface ImageListProps {
  navigation: any;
}
const ImageSlideShow: React.FC<ImageListProps> = observer(({ navigation }) => {

  const directoryKey = '@directory_path'

  useEffect(() => {
    (async () => {
      await imageSliderStore.retrieveData(directoryKey);
    })();
  }, []);


  return (
    imageSliderStore.selectedFolderUris ?
      <SafeAreaView style={styles.sectionContainer}>
        <KeepAwake />
        <ImageList navigation={navigation} />
        {imageSliderStore.isSidebarOpen ? <Sidebar navigation={navigation} /> : null}
      </SafeAreaView> :

      <SafeAreaView style={styles.HomePageContainer}>
        <Text style={styles.sectionTitle}>Choose a directory</Text>
        <Button title="Pick Folder" onPress={() => imageSliderStore.pickFolder(imageSliderStore.updateSelectedFolderUris)} />
      </SafeAreaView>
  );
})

export default ImageSlideShow;