import { useEffect } from 'react';
import { Button, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/app.style';
import ImageList from './ImageList';
import KeepAwake from 'react-native-keep-awake';
import Sidebar from './Sidebar';
import { directoryKey } from '../consts/Key.const'
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { useSettingsContext } from '../common/context/SettingsContext';


interface ImageListProps {
    navigation: any;
}

const ImageSlideShow: React.FC<ImageListProps> = ({ navigation }) => {

    const { retrieveData, setSelectedFolderUris, selectedFolderUris, isSidebarOpen, pickFolder } = useImageSliderContext();
    const { update_all_data } = useSettingsContext();

    useEffect(() => {
        (async () => {
            const data = await retrieveData(directoryKey);
            setSelectedFolderUris(data)

            await update_all_data();
        })();
    }, []);


    return (
        selectedFolderUris ?
            <SafeAreaView style={styles.sectionContainer}>
                <KeepAwake />
                <ImageList />
                {isSidebarOpen ? <Sidebar navigation={navigation} /> : null}
            </SafeAreaView> :

            <SafeAreaView style={styles.HomePageContainer}>
                <Text style={styles.sectionTitle}>Choose a directory</Text>
                <TouchableOpacity onPress={() =>  pickFolder(setSelectedFolderUris)} style={styles.buttonStyle}>
                    <Text style={styles.textButtonStyle}>Pick Folder</Text>
                </TouchableOpacity>
                {/* <Button title="Pick Folder" onPress={() => pickFolder(setSelectedFolderUris)} /> */}
            </SafeAreaView>
    );
}

export default ImageSlideShow;