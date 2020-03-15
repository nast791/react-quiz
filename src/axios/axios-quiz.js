import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-663d1.firebaseio.com/'
});