import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import globalStyles from '../constants/Styles';
import Color from '../constants/Color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import navigationKeys from '../constants/navigationKeys';
import { useSelector, useDispatch } from 'react-redux';
import { addQr } from '../redux/dataSlice';

const QrBox = () => {
  const navigation = useNavigation();
  const { QrCode } = useSelector((state: any) => state);
  const [input, setInput] = useState(QrCode);
  const dispatch = useDispatch();
  const handleInput = () => {
    dispatch(addQr(input));
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(navigationKeys.Qr)} >
      {QrCode ? (
        <TextInput value={input} style={globalStyles.generalText} onChangeText={(text) => setInput(text)} onEndEditing={handleInput} />
      ) : (
        <Text style={globalStyles.generalText}>Select QR Code</Text>
      )}
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
