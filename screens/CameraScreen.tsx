import React, { useContext, useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import globalStyles from "../constants/Styles";
import Layout from "../constants/Layout";
import Color from "../constants/Color";
import navigationKeys from "../constants/navigationKeys";
import { ImageContext } from "../contexts/imageContext";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(null);
  const { setImageUri } = useContext(ImageContext);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (hasPermission) {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const { uri } = await cameraRef.current.takePictureAsync(options);
        if (uri) {
          cameraRef.current.pausePreview();
          setImageUri(uri);
          navigation.navigate(navigationKeys.Support)
        }
      }
    }
  };

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <Camera style={styles.cameraContainer} ref={cameraRef} type={CameraType.back}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={globalStyles.generalText}>Take a Picture</Text>
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