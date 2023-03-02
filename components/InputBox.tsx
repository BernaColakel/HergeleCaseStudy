import React, { useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import globalStyles from '../constants/Styles';
import { addComment } from '../redux/dataSlice';

const InputBox = () => {
  const textInput = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const onEnd = (_val: string) => {
    dispatch(addComment(_val))
  };

  return (
    <View style={styles.container} >
      <TextInput
        placeholder="Please write comment"
        placeholderTextColor={Color.supportScreen.text}
        multiline
        style={[styles.textInput, globalStyles.text]}
        ref={textInput}
        onEndEditing={(e) => { onEnd(e.nativeEvent.text) }}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Color.supportScreen.box,
    height: Layout.window.height * 0.18,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  textInput: {
    textAlignVertical: 'top',
    height: '100%',
  },
});
