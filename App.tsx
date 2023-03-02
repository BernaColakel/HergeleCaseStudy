import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RequestProvider } from './contexts/requestContext';

const App = () => {

  return (
    <Provider store={store}>
      <RequestProvider>
        <StatusBar />
        <Navigation />
      </RequestProvider>
    </Provider>
  );
};

export default App;

