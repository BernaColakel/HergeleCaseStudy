import * as React from 'react';
import SupportScreen from '../screens/SupportScreen';
import { NavigationContainer } from '@react-navigation/native';
import Color from '../constants/Color';
import CameraScreen from '../screens/CameraScreen';
import navigationKeys from '../constants/navigationKeys';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QrScreen from '../screens/QrScreen';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={navigationKeys.Support} >
        <Stack.Screen name={navigationKeys.Support} component={SupportScreen}
          options={{
            headerTintColor: Color.supportScreen.tint_Color,
            headerStyle: {
              backgroundColor: Color.background.background,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'left',
            headerLeft: () => <Header/>
          }}
        />
        <Stack.Screen name={navigationKeys.Camera} component={CameraScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: Color.supportScreen.tint_Color,
            headerLeft: () => <Header/>

          }}
        />
        <Stack.Screen name={navigationKeys.Qr} component={QrScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerLeft: () => <Header/>
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

