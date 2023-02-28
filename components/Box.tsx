import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../constants/Styles';
import Color from '../constants/Color';
import { FontAwesome5 } from '@expo/vector-icons';

const Box = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={globalStyles.generalText}>Your Location</Text>
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
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
});

export default Box;
