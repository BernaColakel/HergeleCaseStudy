import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import globalStyles from "../constants/Styles";
import Color from "../constants/Color";
import { Feather, Entypo } from '@expo/vector-icons';
import { Camera, BarCodeScanningResult, FlashMode } from "expo-camera";
import { useDispatch} from 'react-redux';
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


  const handleBarCodeScanned = (scanResult:BarCodeScanningResult) => {
    setScanned(true);
    dispatch(addQr(scanResult.data));
    navigation.navigate(navigationKeys.Support)
    console.log('barcode result', scanResult.data)
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

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

  return (
    <Camera
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={globalStyles.container}
      flashMode={isFlashOn? FlashMode.torch : FlashMode.off}
    >
      <View style={styles.buttonContainer}>
        <View>
          <Text style={{color: 'white'}}>heyyy</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
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

const styles = StyleSheet.create({
  buttonContainer: {
    height: '100%',
    bottom: '25%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  qrButton: {
    flexDirection: 'row',
    height: 60,
    width: 160,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
});

export default QrScreen;