import { Appearance } from 'react-native';

const isDarkMode = Appearance.getColorScheme() === 'dark';
const darkColor = {
  //Greys
  primary: '#333333',
  //Pink
  secondary: '#A52A5D',
  // Whites
  tertiary: '#FFFFFF',
};

const color = {
  //Greys
  primary: '#333333',
  // Pinks
  secondary: '#A52A5D',
  // Whites
  tertiary: '#FFFFFF',
};

const Colors = isDarkMode ? darkColor : color;

export default {
  background: {
    background: Colors.primary,
  },
  supportScreen: {
    tint_Color: Colors.tertiary,
    text: Colors.tertiary,
    box: Colors.secondary,
  },
};
