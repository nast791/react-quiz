import {CREATE_QUIZ_ITEM, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
  quiz: []
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_ITEM:
      return {
        ...state, quiz: [...state.quiz, action.item]
      };
    case RESET_QUIZ_CREATION:
      return {
        ...state, quiz: []
      };
    default:
      return state;
  }
}