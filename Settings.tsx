import { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { styles } from './my_style';

interface SettingsProps {
    navigation: any; // Replace 'any' with the appropriate navigation type
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {

   
    useEffect(() => {
    }, []);

    return (
        <SafeAreaView style={styles.HomePageContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>

            
        </SafeAreaView>
    );
}

export default Settings;
