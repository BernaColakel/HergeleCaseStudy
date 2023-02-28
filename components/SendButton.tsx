import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../constants/Color';
import globalStyles from '../constants/Styles';

const SendButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={globalStyles.generalText}>Send</Text>
    </TouchableOpacity>
  );
};

export default SendButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.supportScreen.box,
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
  },
});
