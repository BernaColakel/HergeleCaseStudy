import React, {useRef} from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Color from '../constants/Color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import navigationKeys from '../constants/navigationKeys';
import { useSelector, useDispatch } from 'react-redux';
import { addQr } from '../redux/dataSlice';
import Layout from '../constants/Layout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const QrBox = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { QrCode } = useSelector((state: any) => state);
  const textInput = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const onEnd = (_val: any) => {
    if (_val.length =! 6) {
      Alert.alert('QR Code is not valid!');
    }
   dispatch(addQr(_val))
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigate(navigationKeys.Qr)} >
      {QrCode ? (
        <TextInput style={[styles.textInput, styles.text]} defaultValue={QrCode} ref={textInput}
        onEndEditing={(e) => {onEnd(e.nativeEvent.text)}} 
        />
      ) : (
        <Text style={styles.text}>Select QR Code</Text>
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
    height: Layout.window.height * 0.065,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  text: {
    color: Color.supportScreen.text,
    fontWeight: '300',
    letterSpacing: 0.2,
  },
  textInput: {
    width: '85%',
  }
});

export default QrBox;
