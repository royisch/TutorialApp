import axios from 'axios';
import { SEARCH_API, GOING_TO_SEARCH, FINISH_TO_SEARCH, CLEAR_DATA } from '../constants/ActionTypes';


const instance = axios.create({
  baseURL: 'https://api.iextrading.com/1.0/stock',
  timeout: 30000
});

export const searchApiAction = data => (dispatch) => {
  dispatch({
    type: SEARCH_API,
    payload: data
  });
};

export const clearData = () => (dispatch) => {
  dispatch({
    type: CLEAR_DATA
  });
};

export const goingToSearchApiAction = () => (dispatch) => { dispatch({ type: GOING_TO_SEARCH }); };
export const finishToSearchApiAction = () => (dispatch) => { dispatch({ type: FINISH_TO_SEARCH }); };

  
export const searchApi = ({ symbol }) => async (dispatch) => {
  try {
    if (!symbol) {
      return Promise.reject();
    }

    const url = `/${symbol}/batch?types=quote,news,chart&range=1m&last=10`;
    goingToSearchApiAction();
    const response = await instance.get(url);
    dispatch(searchApiAction(response.data));
    return response;
  } catch (e) {
    return e;
  } finally {
    dispatch(finishToSearchApiAction());
  }
};


// export const searchExchange = () => {
//   symbol = 'appl';
//   return ;
// };
