import React from 'react';
import './AnswersList.scss';
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = props => (
  <ul className="answers-list">
    { props.answers.map((item, index) => {
      return (
        <AnswerItem key={index} answer={item} onAnswerClick={props.onAnswerClick} state={props.state ? props.state[item.id] : null}/>
      )
    })}
  </ul>
)

export default AnswersList;