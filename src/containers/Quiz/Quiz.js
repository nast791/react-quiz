import React, {Component} from 'react';
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    const {loading, quiz, activeQuestion, answerState, isFinished, results, quizAnswerClick, retryQuiz} = this.props;
    return (
      <div className="quiz">
        <div className="quiz__wrapper">
          <h1>Ответьте на все вопросы</h1>

          {
            loading || !quiz
            ? <Loader/>
            : isFinished
              ? <FinishedQuiz quiz={quiz} results={results} onRetry={retryQuiz}/>
              : <ActiveQuiz answers={quiz[activeQuestion].answers} question={quiz[activeQuestion].question} onAnswerClick={quizAnswerClick} quizLength={quiz.length} answerNumber={activeQuestion + 1} state={answerState}/>
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { results, isFinished, activeQuestion, answerState, quiz, loading, error } = state.quiz;
  return { results, isFinished, activeQuestion, answerState, quiz, loading, error }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);