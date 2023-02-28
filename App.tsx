import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import globalStyles from './constants/Styles';
import Navigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <StatusBar />
          <Navigation />
      </View>
    </Provider>
  );
};

export default App;
