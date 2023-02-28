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
  },
  generalText: {
    color: Color.supportScreen.text,
  },
});

export default globalStyles;
