import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "react-native";
import globalStyles from "../constants/Styles";
import Color from "../constants/Color";
import { Feather, Entypo } from '@expo/vector-icons';
import { Camera, BarCodeScanningResult, FlashMode } from "expo-camera";
import { useDispatch } from 'react-redux';
import { addQr } from "../redux/dataSlice";
import { BarCodeScanner } from "expo-barcode-scanner";
import navigationKeys from "../constants/navigationKeys";
import { useNavigation } from "@react-navigation/native";

const QrScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  const cameraRef = useRef<Camera>(null);
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const navigation = useNavigation();


  const handleBarCodeScanned = (scanResult: BarCodeScanningResult) => {
    setScanned(true);
    dispatch(addQr(scanResult.data));
    navigation.navigate(navigationKeys.Support)
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  useEffect(() => {
    const permisionFunction = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permission for camera access needed.');
      }
    };
    permisionFunction();
  }, []);

  const CaptureBox = () => {
    return (
      <View style={styles.captureBox}>
        <View style={styles.topLeft} />
        <View style={styles.topRight} />
        <View style={styles.bottomRight} />
        <View style={styles.bottomLeft} />
      </View>
    )
  }
  return (
    <Camera
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={globalStyles.container}
      flashMode={isFlashOn ? FlashMode.torch : FlashMode.off}
    >
      <View style={styles.buttonContainer}>
        <CaptureBox />
        <View style={styles.horizantalAlign}>
          <TouchableOpacity style={styles.qrButton}>
            <Text style={globalStyles.generalText}>QR Code</Text>
            <Feather name={'check'} size={30} color={Color.supportScreen.tint_Color} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash} >
            <Entypo name={'flash'} size={30} color={Color.supportScreen.tint_Color} />
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  )
};

const edge: ViewStyle = {
  borderColor: 'white',
  borderLeftWidth: 1,
  borderTopWidth: 1,
  position: 'absolute',
  height: 44,
  width: 44,
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: '25%'
  },
  qrButton: {
    flexDirection: 'row',
    height: 60,
    width: 160,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: Color.background.background,
  },
  flashButton: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Color.background.background,
    marginLeft: 18,
  },
  horizantalAlign: {
    flexDirection: 'row',
  },
  captureBox: {
    height: 180,
    width: 180,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  bottomRight: {
    transform: [{ rotate: '180deg' }],
    ...edge,
    right: 0,
    bottom: 0,
  },
  bottomLeft: {
    transform: [{ rotateX: '180deg' }],
    ...edge,
    bottom: 0,
    left: 0,
  },
  topLeft: {
    ...edge,
    left: 0,
    top: 0,
  },
  topRight: {
    transform: [{ rotateY: '180deg' }],
    ...edge,
    top: 0,
    right: 0,
  },
});

export default QrScreen;