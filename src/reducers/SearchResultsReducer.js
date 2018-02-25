import { SEARCH_API, GOING_TO_SEARCH, FINISH_TO_SEARCH, CLEAR_DATA } from '../constants/ActionTypes';

const INITIAL_STATE = {
  data: {},
  showLoader: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOING_TO_SEARCH: {
      return { ...state, showLoader: true };
    }
    case SEARCH_API: {
      return { ...state, data: action.payload };
    }
    case CLEAR_DATA: {
      return { ...state, data: [] };
    }
    case FINISH_TO_SEARCH: {
      return { ...state, showLoader: false };
    }
    default:
      return state;
  }
};
