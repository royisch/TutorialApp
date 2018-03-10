import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import storeFactory from './src/store';
import Search from './src/components/Search';

export default App = () => {
  const store = storeFactory();

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <Search />
      </Provider>
    </View>
  );
};
