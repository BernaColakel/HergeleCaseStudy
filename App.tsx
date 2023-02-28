import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import globalStyles from './constants/Styles';
import Navigation from './navigation/Navigation';
import { ImageProvider } from './contexts/imageContext';

const App = () => {

  return (
    <View style={globalStyles.container}>
      <StatusBar />
      <ImageProvider>
        <Navigation />
      </ImageProvider>
    </View>
  );
};

export default App;
