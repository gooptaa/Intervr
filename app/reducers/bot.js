/*****
This will keep track of the bot's interview questions.
*****/
import axios from 'axios';

/* -------------------<   ACTIONS   >--------------------- */
const GET_QUESTIONS = "GET_QUESTIONS";

/* ---------------<   ACTION CREATORS   >------------------- */
const getQuestions = (questions) => ({questions, type: GET_QUESTIONS});

/* -------------------<   REDUCERS   >--------------------- */
initialState = {
  general: [],
  technical: [],
  intro: [],
}

export default function botReducer (state = initialState, action) {
  switch(action.type){
    case GET_QUESTIONS:
      return Object.assign({}, state, action);
    default: return state;
  }
}

/* ------------------<   DISPATCHERS   >-------------------- */
export const getAllQuestions= () => dispatch => {
  let general = axios.get('/general')
  .then((res) => res.data)
  .catch(next)
  let intro = axios.get('/intro')
  .then((res) => res.data)
  .catch(next)
  let technical = axios.get('/technical')
  .then((res) => res.data)
  .catch(next)

  Promise.all([general, intro, technical])
  .spread((general, intro, technical) => dispatch(getQuestions({general, intro, technical})));
}

