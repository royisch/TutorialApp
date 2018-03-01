import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import storeFactory from './src/store';

export default App = () => {
  const store = storeFactory();

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Welcome To Your Tuturial App</Text>
        </View>
      </Provider>
    </View>
  );
};
