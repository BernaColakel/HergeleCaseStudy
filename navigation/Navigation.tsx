import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import SupportScreen from '../screens/SupportScreen';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from '../constants/Color';
import CameraScreen from '../screens/CameraScreen';
import navigationKeys from '../constants/navigationKeys';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from '../constants/Layout';
import QrScreen from '../screens/QrScreen';

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
            headerLeft: () => (
              <TouchableOpacity style={styles.supportHeader} >
                <MaterialCommunityIcons name="menu" size={30} color={Color.supportScreen.tint_Color} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name={navigationKeys.Camera} component={CameraScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: Color.supportScreen.tint_Color,
            headerLeft: () => (
              <TouchableOpacity style={styles.cameraContainer} >
                <MaterialCommunityIcons name="menu" size={30} color={Color.supportScreen.tint_Color} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name={navigationKeys.Qr} component={QrScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: Color.supportScreen.tint_Color,
            headerLeft: () => (
              <TouchableOpacity style={styles.cameraContainer} >
                <MaterialCommunityIcons name="menu" size={30} color={Color.supportScreen.tint_Color} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  supportHeader: {
    width: Layout.window.width * 0.1,
    height: Layout.window.height * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraContainer: {
    width: Layout.window.width * 0.1,
    height: Layout.window.height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.background.background,
    borderRadius: 10,
    margin: 10,
  },
})
