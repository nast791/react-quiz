import {CREATE_QUIZ_ITEM, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizItem  (item) {
  return {
    item,
    type: CREATE_QUIZ_ITEM
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quizes.json', getState().create.quiz);
    dispatch(resetQuizCreation());
  }
}