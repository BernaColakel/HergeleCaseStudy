import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../constants/Color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import navigationKeys from '../constants/navigationKeys';
import {useSelector} from 'react-redux';

const CameraBox = () => {
  const navigation = useNavigation();
  const {imageUri} = useSelector((state: any) => state);

  return (
    <TouchableOpacity style={[styles.container]} onPress={() => navigation.navigate(navigationKeys.Camera)} >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <FontAwesome5 name={'camera'} size={45} color={Color.supportScreen.tint_Color} />
      )}
    </TouchableOpacity>
  );
};

export default CameraBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.supportScreen.box,
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  }
});
