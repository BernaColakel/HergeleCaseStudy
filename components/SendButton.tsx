import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Color from '../constants/Color';
import globalStyles from '../constants/Styles';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';

const SendButton = () => {
  const { location, comment, imageUri, QrCode } = useSelector((state: any) => state);
  const [isValid, setIsValid] = useState<boolean>(false);
  const onSend = () => {
    if (location && comment && imageUri && QrCode) {
      Alert.alert('Support message has been sent')
      setIsValid(true);
    } else {
      Alert.alert('Please fill all required fields')
    }
  };
  return (
    <TouchableOpacity style={[styles.container, isValid ? { backgroundColor: Color.supportScreen.succes } : null]} onPress={onSend}>
      <Text style={globalStyles.text}>Send</Text>
      {isValid ? (
        <Feather style={styles.icon} name={'check'} size={30} color={Color.supportScreen.tint_Color} />
      ) : null}
    </TouchableOpacity>
  );
};

export default SendButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.supportScreen.box,
    justifyContent: 'center',
    borderRadius: 10,
    height: Layout.window.height * 0.065,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
});
