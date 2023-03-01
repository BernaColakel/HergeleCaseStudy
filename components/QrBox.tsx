import React, {useRef} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
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
  const textInput = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const onEnd = (_val: string) => {
   dispatch(addQr(_val))
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(navigationKeys.Qr)} >
      {QrCode ? (
        <TextInput style={globalStyles.textInput} defaultValue={QrCode} ref={textInput}
        onEndEditing={(e) => {onEnd(e.nativeEvent.text)}} 
        />
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
