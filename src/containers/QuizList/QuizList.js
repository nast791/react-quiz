import React, {Component} from 'react';
import './QuizList.scss';
import {NavLink} from "react-router-dom";

class QuizList extends Component {
  renderQuized() {
    return [1, 2, 3].map((item, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + item}>
            Тест {item}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="quiz-list">
        <div>
          <h1>Список тестов</h1>

          <ul>
            { this.renderQuized() }
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;