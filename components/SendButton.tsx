import React, { useContext, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Color from '../constants/Color';
import globalStyles from '../constants/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { clearStates, DataState } from '../redux/dataSlice';
import { RequestContext } from '../contexts/requestContext';

const SendButton = () => {
  const { location, comment, imageUri, QrCode, report } = useSelector((state: any) => state as DataState);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { sendRequest } = useContext(RequestContext)
  const dispatch = useDispatch();

  const onSend = async () => {
    const isAllFalse = Object.keys(report).every((key) => {
      return report[key] === false;
    });
    if (location && comment && imageUri && QrCode && !isAllFalse) {
      const sendResult = await sendRequest();
      if (sendResult.error) {
        Alert.alert('Server error')
      } else {
        dispatch(clearStates())
        setIsValid(true);
        Alert.alert('Support message has been sent')
      }
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
