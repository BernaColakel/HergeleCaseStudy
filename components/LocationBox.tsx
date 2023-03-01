import React, { useRef } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Color from '../constants/Color';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation } from '../redux/dataSlice';
import Layout from '../constants/Layout';

const Box = () => {
  const textInput = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const { location } = useSelector((state: any) => state);
  const onEnd = (_val: string) => {
    dispatch(addLocation(_val))
  };

  const verifyPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location Service not enabled', 'Please enable your location services to continue ', [{ text: 'OK' }],
        { cancelable: false });
      return;
    }
    let currentlocation = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(currentlocation.coords);
    for (let item of address) {
      let fullAddress = `${item.district}, ${item.street}, ${item.postalCode}, ${item.subregion}, ${item.region}`;
      dispatch(addLocation(fullAddress));
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={verifyPermission}>
      {location ? (
        <TextInput defaultValue={location} style={[styles.textInput, styles.text]} ref={textInput} onEndEditing={(e) => { onEnd(e.nativeEvent.text) }} />
      ) : (
        <Text style={styles.text}>Your Location</Text>
      )}
      <TouchableOpacity>
        <FontAwesome5 name={'map-marked-alt'} size={20} color={Color.supportScreen.tint_Color} />
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

export default Box;
