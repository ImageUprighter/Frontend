import { useEffect } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { styles } from '../styles/app.style';
import ImageList from './ImageList';
import KeepAwake from 'react-native-keep-awake';
import Sidebar from './Sidebar';
import { imageSliderStore } from '../stores/ImageSlider.store';
import { observer } from 'mobx-react';
import { directoryKey } from '../consts/Key.const'
import { settingsStore } from '../stores/Settings.store';


interface ImageListProps {
    navigation: any;
}

const ImageSlideShow: React.FC<ImageListProps> = observer(({ navigation }) => {

    useEffect(() => {
        (async () => {
            const data = await imageSliderStore.retrieveData(directoryKey);
            imageSliderStore.updateSelectedFolderUris(data)

            await settingsStore.update_all_data();
        })();
    }, []);


    return (
        imageSliderStore.selectedFolderUris ?
            <SafeAreaView style={styles.sectionContainer}>
                <KeepAwake />
                <ImageList />
                {imageSliderStore.isSidebarOpen ? <Sidebar navigation={navigation} /> : null}
            </SafeAreaView> :

            <SafeAreaView style={styles.HomePageContainer}>
                <Text style={styles.sectionTitle}>Choose a directory</Text>
                <Button title="Pick Folder" onPress={() => imageSliderStore.pickFolder(imageSliderStore.updateSelectedFolderUris)} />
            </SafeAreaView>
    );
})

export default ImageSlideShow;