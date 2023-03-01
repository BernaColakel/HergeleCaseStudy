import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType, PermissionStatus } from "expo-camera";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import globalStyles from "../constants/Styles";
import Layout from "../constants/Layout";
import Color from "../constants/Color";
import navigationKeys from "../constants/navigationKeys";
import { useNavigation } from "@react-navigation/native";
import { addImageUri } from "../redux/dataSlice";
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const CameraScreen = () => {
  const cameraRef = useRef<Camera>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const verifyPermission = async () => {
    if (permission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (permission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission!',
        'You need to grant camera permissions to take a picture.'
      );
      return false;
    };
    return true;
  };

  const checkPermission = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      setIsReady(false)
    };
    setIsReady(true);
  };

  useEffect(() => {
    checkPermission();
  }, [])

  const takePicture = async () => {
    if (isReady) {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const { uri } = await cameraRef.current.takePictureAsync(options);
        if (uri) {
          cameraRef.current.pausePreview();
          dispatch(addImageUri(uri as string));
          navigate(navigationKeys.Support)
        }
      }
    }
  };

  useEffect(() => {
    if (permission?.status === PermissionStatus.GRANTED) {
      cameraRef.current?.render();
    } else {
      verifyPermission();
    }
  }, [permission]);

  return (
    <View style={globalStyles.container}>
      <Camera style={styles.cameraContainer} ref={cameraRef} type={CameraType.back}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={globalStyles.text}>Take a Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: '100%',
    bottom: '15%',
    alignItems: 'center',
  },
  captureButton: {
    height: Layout.window.height * 0.1,
    width: Layout.window.width * 0.4,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: Color.background.background,
  },
});

export default CameraScreen;