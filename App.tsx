import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {

  return (
    <Provider store={store}>
        <StatusBar />
          <Navigation />
    </Provider>
  );
};

export default App;

