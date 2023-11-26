import { useEffect } from 'react';
import HomePage from './src/pages/HomePage';
import Settings from './src/pages/Settings';
import ImageSlideShow from './src/components/ImageSlideShow';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageSliderProvider } from './src/common/context/ImageSliderContext';
import { SettingsProvider } from './src/common/context/SettingsContext';
import { requestAllPermissions } from './src/components/Permissions';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {

    useEffect(() => {
        (async () => {
            SystemNavigationBar.navigationHide();
            await requestAllPermissions();
        })();
    }, []);

    return (
        <ImageSliderProvider>
            <SettingsProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={HomePage} />
                        <Stack.Screen name="Settings" component={Settings} />
                        <Stack.Screen name="ImageSlideShow" component={ImageSlideShow} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SettingsProvider>
        </ImageSliderProvider>

    );
}
