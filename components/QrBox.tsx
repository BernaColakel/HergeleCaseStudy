import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../constants/Styles';
import Color from '../constants/Color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import navigationKeys from '../constants/navigationKeys';

const QrBox = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(navigationKeys.Qr)} >
      <Text style={globalStyles.generalText}>Select QR Code</Text>
      <TouchableOpacity>
        <FontAwesome5 name={'qrcode'} size={20} color={Color.supportScreen.tint_Color} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Color.supportScreen.box,
    marginBottom: 10,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
});

export default QrBox;
