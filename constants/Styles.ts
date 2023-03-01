import { StyleSheet } from 'react-native';
import Color from './Color';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: Color.supportScreen.text,
    fontWeight: '300',
    letterSpacing: 0.2,
  },
});

export default globalStyles;
