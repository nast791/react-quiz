import React from 'react';
import './FinishedQuiz.scss';
import Button from '../Button/Button';
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total;
  }, 0)
  return (
    <div className="finished-quiz">
      <ul>
        { props.quiz.map((item, index) => {
          const classes = ['fa', props.results[item.id] === 'error' ? 'fa-times' : 'fa-check'];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {item.question}
              <i className={classes.join(' ')}/>
            </li>
          )
        })}
      </ul>

      <p>Правильно {successCount} из {props.quiz.length}</p>

      <Button onClick={props.onRetry} type="primary">Повторить</Button>
      <Link to="/">
        <Button type="success">Перейти к списку тестов</Button>
      </Link>
    </div>
  )
}

export default FinishedQuiz;