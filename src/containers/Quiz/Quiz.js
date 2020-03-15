import React, {Component} from 'react';
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/Loader/Loader";

export default class Quiz extends Component {
  state = {
    results: {}, // {[id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' 'error'}
    quiz: [],
    loading: true
  };

  onAnswerClick = (answerId) => {
    const {quiz, activeQuestion, answerState, results } = this.state;
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'success') {
        return;
      }
    }
    const question = quiz[activeQuestion];

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState((prevState) => ({
            answerState: null,
            activeQuestion: prevState.activeQuestion + 1
          }));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  };

  isQuizFinished() {
    const {quiz, activeQuestion} = this.state;
    return activeQuestion + 1 === quiz.length;
  }

  retry = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  };

  async componentDidMount() {
    try {
      const res = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      const quiz = res.data;

      this.setState({
        quiz,
        loading: false
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {quiz, activeQuestion, answerState, isFinished, results} = this.state;
    return (
      <div className="quiz">
        <div className="quiz__wrapper">
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.loading
            ? <Loader/>
            : isFinished
              ? <FinishedQuiz quiz={quiz} results={results} onRetry={this.retry}/>
              : <ActiveQuiz answers={quiz[activeQuestion].answers} question={quiz[activeQuestion].question} onAnswerClick={this.onAnswerClick} quizLength={quiz.length} answerNumber={activeQuestion + 1} state={answerState}/>
          }

        </div>
      </div>
    )
  }
}