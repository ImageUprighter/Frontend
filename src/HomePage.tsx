import { Button, SafeAreaView, Text } from 'react-native';

import { styles } from '../styles/app.style';


interface HomePageProps {
    navigation: any; // Replace 'any' with the appropriate navigation type
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {

    function navigateTo(pageName: string) {
        navigation.navigate(pageName);
    }

    return (
        <SafeAreaView style={styles.HomePageContainer}>
            <Text style={styles.sectionTitle}>Image Slider</Text>
            <Button title='Go To Settings' onPress={() => navigateTo("Settings")} />
            <Button title='Show Image Slide Show' onPress={() => navigateTo("ImageSlideShow")} />
        </SafeAreaView>
    );
}

export default HomePage;
