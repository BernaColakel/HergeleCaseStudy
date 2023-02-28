import React from 'react';
import { SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import Box from '../components/Box';
import CameraBox from '../components/CameraBox';
import InputBox from '../components/InputBox';
import QrBox from '../components/QrBox';
import ReportBox from '../components/ReportBox';
import SendButton from '../components/SendButton';
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
    flex: 1,
    margin: 30,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
  },

});