import { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles/app.style';
import PopupWithSelectOptions from './PopupWithSelect';

interface SettingsProps {
    navigation: any; // Replace 'any' with the appropriate navigation type
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {


    useEffect(() => {
    }, []);

    function navigateTo(pageName: string) {
        navigation.navigate(pageName);
    }

    return (
        <SafeAreaView style={styles.HomePageContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <PopupWithSelectOptions data={[
                'Option 1',
                'Option 2',
                'Option 3',
            ]} />

            <View>
                <Text>Choose </Text>
                <TouchableOpacity onPress={() => navigateTo("Settings")} style={styles.buttonStyle}>
                    <Text style={styles.textButtonStyle}>Go To Settings</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigateTo("ImageSlideShow")} style={styles.buttonStyle}>
                <Text style={styles.textButtonStyle}>Show Image Slide Show</Text>
            </TouchableOpacity>


        </SafeAreaView>
    );
}

export default Settings;
