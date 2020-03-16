import React, {Component} from 'react';
import './QuizList.scss';
import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {connect} from 'react-redux';
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component {
  renderQuized() {
    return this.props.quizes.map((item) => {
      return (
        <li key={item.id}>
          <NavLink to={'/quiz/' + item.id}>
            {item.name}
          </NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className="quiz-list">
        <div>
          <h1>Список тестов</h1>

          { this.props.loading && this.props.quizes.length !== 0
            ? <Loader/>
            : <ul>
              { this.renderQuized() }
            </ul>
          }

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {quizes, loading, error} = state.quiz;
  return {
    quizes, loading, error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);