import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import globalStyles from "../constants/Styles";
import Color from "../constants/Color";
import { Feather, Entypo } from '@expo/vector-icons';
import { BarCodeScanner } from "expo-barcode-scanner";


const QrScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={styles.cameraContainer}
    >
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.qrButton} >
            <Text style={globalStyles.generalText}>QR Code</Text>
            <Feather name={'check'} size={30} color={Color.supportScreen.tint_Color} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashButton}>
            <Entypo name={'flash'} size={30} color={Color.supportScreen.tint_Color} />
          </TouchableOpacity>
        </View>
      </View>
    </BarCodeScanner>
  )
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
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