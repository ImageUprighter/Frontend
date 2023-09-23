import { useEffect } from 'react';
import HomePage from './HomePage';
import Settings from './Settings';
import ImageSlideShow from './ImageSlideShow';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  
  useEffect(() => {
    (async () => {

      // const storagePermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      SystemNavigationBar.navigationHide();
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ImageSlideShow" component={ImageSlideShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
