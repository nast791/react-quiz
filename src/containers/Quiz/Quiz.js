import React, {Component} from 'react';
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

export default class Quiz extends Component {
  state = {
    results: {}, // {[id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' 'error'}
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо?',
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Синий', id: 2},
          {text: 'Красный', id: 3},
          {text: 'Зеленый', id: 4},
        ],
        rightAnswerId: 2,
      },
      {
        id: 2,
        question: 'В каком году основали Санкт-Петербург?',
        answers: [
          {text: '1700', id: 1},
          {text: '1702', id: 2},
          {text: '1703', id: 3},
          {text: '1803', id: 4},
        ],
        rightAnswerId: 3,
      }
    ]
  }

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
  }

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
  }

  render() {
    const {quiz, activeQuestion, answerState, isFinished, results} = this.state;
    return (
      <div className="quiz">
        <div className="quiz__wrapper">
          <h1>Ответьте на все вопросы</h1>

          {
            isFinished
            ? <FinishedQuiz quiz={quiz} results={results} onRetry={this.retry}/>
            : <ActiveQuiz answers={quiz[activeQuestion].answers} question={quiz[activeQuestion].question} onAnswerClick={this.onAnswerClick} quizLength={quiz.length} answerNumber={activeQuestion + 1} state={answerState}/>
          }


        </div>
      </div>
    )
  }
}