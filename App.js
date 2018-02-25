import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { Root } from './Router';
import storeFactory from './src/store';

export default App = () => {
  const store = storeFactory();

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <Root />
      </Provider>
    </View>
  );
};
