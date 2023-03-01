import { StyleSheet } from 'react-native';
import Color from './Color';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  supportScreenContainer: {
    backgroundColor: Color.background.background,
    flex: 1,
  },
  selectableText: {
    color: Color.supportScreen.text,
    fontSize: 11,
    fontWeight: '300',
    letterSpacing: 0.2
  },
  generalText: {
    color: Color.supportScreen.text,
    fontWeight: '300',
    letterSpacing: 0.2
  },
  textInput: {
    width: '85%',
    color: Color.supportScreen.text,
    fontWeight: '300',
    letterSpacing: 0.2
  }
});

export default globalStyles;
