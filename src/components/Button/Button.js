import React from 'react';
import './Button.scss';

const Button = props => {
  const classes = ['button', props.type];
  return (
    <button type="button" onClick={props.onClick} className={classes.join(' ')} disabled={props.disabled}>
      {props.children}
    </button>
  )
}

export default Button;