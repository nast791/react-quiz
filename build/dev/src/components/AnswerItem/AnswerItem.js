import React from 'react';
import './AnswerItem.scss';

const AnswerItem = props => {
  const classes = ['answer-item']
  if (props.state) {
    classes.push(props.state);
  }

  return (
    <li className={classes.join(' ')} onClick={props.onAnswerClick.bind(this, props.answer.id)}>
      { props.answer.text }
    </li>
  )
}

export default AnswerItem;