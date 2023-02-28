import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Color from '../constants/Color';

const InputBox = () => {
  return (
    <View style={styles.container} >
      <TextInput
        placeholder="Please write comment"
        placeholderTextColor={Color.supportScreen.text}
        multiline
        style={styles.textInput}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Color.supportScreen.box,
    height: 140,
    padding: 15,
    width: '100%',
  },
  textInput: {
    height: '100%',
    textAlignVertical: 'top',
    color: Color.supportScreen.text,
  }
});
