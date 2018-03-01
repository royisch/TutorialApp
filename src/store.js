import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import reducers from './reducers/index';

let storeInstance;

export default function () {
  if (storeInstance) {
    return storeInstance;
  }
  
  storeInstance = (createStore)(
    reducers,
    compose(
      compose(
        applyMiddleware(thunkMiddleware)
      ),
      devTools({
        name: Platform.OS,
        hostname: 'localhost',
        port: 5678
      })
    )
  );

  return storeInstance;
}
