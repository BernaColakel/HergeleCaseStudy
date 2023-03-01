import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "react-native";
import globalStyles from "../constants/Styles";
import Color from "../constants/Color";
import { Feather, Entypo } from '@expo/vector-icons';
import { Camera, BarCodeScanningResult, FlashMode, PermissionStatus } from "expo-camera";
import { useDispatch } from 'react-redux';
import { addQr } from "../redux/dataSlice";
import { BarCodeScanner } from "expo-barcode-scanner";
import navigationKeys from "../constants/navigationKeys";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const QrScreen = () => {
  const [scanned, setScanned] = useState<boolean>(false);
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const handleBarCodeScanned = (scanResult: BarCodeScanningResult) => {
    if (isReady) {
      setScanned(true);
      if (scanResult.data.length != 6) {
        Alert.alert('QR Code is not valid!');
        navigate(navigationKeys.Support)
      } else {
        dispatch(addQr(scanResult.data));
        navigate(navigationKeys.Support)
      }
    }
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

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
    if (permission?.status === PermissionStatus.GRANTED) {
      cameraRef.current?.render();
    } else {
      verifyPermission();
    }
  }, [permission]);
  useEffect(() => {
    checkPermission();
  }, [])

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
    ref={cameraRef}
    >
      <View style={styles.buttonContainer}>
        <CaptureBox />
        <View style={styles.horizantalAlign}>
          <TouchableOpacity style={styles.qrButton}>
            <Text style={globalStyles.text}>QR Code</Text>
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