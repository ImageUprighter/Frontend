import { useEffect } from 'react';
import HomePage from './src/HomePage';
import Settings from './src/Settings';
import ImageSlideShow from './src/ImageSlideShow';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'mobx-react';
import { imageSliderStore } from './stores/ImageSlider.store';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {

  useEffect(() => {
    (async () => {

      // const storagePermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      SystemNavigationBar.navigationHide();
    })();
  }, []);

  return (
    <Provider store={imageSliderStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ImageSlideShow" component={ImageSlideShow} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}
