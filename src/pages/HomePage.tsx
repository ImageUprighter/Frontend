import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { styles } from '../styles/app.style';
import { useEffect } from 'react';
import { useSettingsContext } from '../common/context/SettingsContext';
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { directoryKey } from '../consts/Key.const';


interface HomePageProps {
    navigation: any; // Replace 'any' with the appropriate navigation type
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
    const { retrieveData, setSelectedFolderUris, selectedFolderUris, isSidebarOpen, pickFolder } = useImageSliderContext();
    const { update_all_data } = useSettingsContext();

    useEffect(() => {
        (async () => {
            const data = await retrieveData(directoryKey);
            if (data) navigateTo("ImageSlideShow")

        })()
    }, [])
    function navigateTo(pageName: string) {
        navigation.navigate(pageName);
    }

    return (
        <SafeAreaView style={styles.HomePageContainer}>
            <Text style={styles.sectionTitle}>Image Slider</Text>
            <TouchableOpacity onPress={() => navigateTo("Settings")} style={styles.buttonStyle}>
                <Text style={styles.textButtonStyle}>Go To Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("ImageSlideShow")} style={styles.buttonStyle}>
                <Text style={styles.textButtonStyle}>Show Image Slide Show</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default HomePage;
