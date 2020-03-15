import React, {Component} from 'react';
import './QuizList.scss';
import {NavLink} from "react-router-dom";
import axios from '../../axios/axios-quiz';
import Loader from "../../components/Loader/Loader";

class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  };

  renderQuized() {
    return this.state.quizes.map((item) => {
      return (
        <li key={item.id}>
          <NavLink to={'/quiz/' + item.id}>
            {item.name}
          </NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/quizes.json');

      const quizes = [];
      Object.keys(res.data).forEach((item, index) => {
        quizes.push({
          id: item,
          name: `Тест №${index + 1}`
        })
      });

      this.setState({
        quizes,
        loading: false
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="quiz-list">
        <div>
          <h1>Список тестов</h1>

          { this.state.loading
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

export default QuizList;