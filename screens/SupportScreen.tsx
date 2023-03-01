import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import Box from '../components/Box';
import CameraBox from '../components/CameraBox';
import InputBox from '../components/InputBox';
import QrBox from '../components/QrBox';
import ReportBox from '../components/ReportBox';
import SendButton from '../components/SendButton';
import Layout from '../constants/Layout';
import globalStyles from '../constants/Styles';

const SupportScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={globalStyles.supportScreenContainer}>
        <View style={styles.innerContainer}>
          <View>
            <Box />
            <QrBox />
            <View style={styles.rowContainer}>
              <CameraBox />
              <ReportBox />
            </View>
            <InputBox />
          </View>
          <SendButton />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  innerContainer: {
    margin: 30,
    height: Layout.window.height * 0.8,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
  },

});