import React from 'react';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import gameReducer from './store/reducers/game';
import AppNavigator from './navigation/AppNavigator';

const store = createStore(gameReducer);

export default function App() {
  return (
  <Provider store={store}>
    <AppNavigator />
    </Provider>
  );
}
