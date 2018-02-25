import { combineReducers } from 'redux';
import searchResults from '../reducers/SearchResultsReducer';

// this is the apps store state as received from the different reducers
export default combineReducers({
  searchResults
});
