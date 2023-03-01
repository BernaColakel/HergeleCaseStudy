import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import Box from '../components/LocationBox';
import CameraBox from '../components/CameraBox';
import InputBox from '../components/InputBox';
import QrBox from '../components/QrBox';
import ReportBox from '../components/ReportBox';
import SendButton from '../components/SendButton';
import Layout from '../constants/Layout';
import Color from '../constants/Color';

const SupportScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
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
  container: {
    backgroundColor: Color.background.background,
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: Layout.window.width * 0.08,
    paddingVertical: Layout.window.height * 0.04,
    height: Layout.window.height * 0.9,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
  },

});