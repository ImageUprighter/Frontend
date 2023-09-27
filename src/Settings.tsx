import { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles/app.style';

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
