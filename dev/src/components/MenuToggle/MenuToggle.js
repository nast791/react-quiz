import React from 'react';
import './MenuToggle.scss';

const MenuToggle = props => {
  const classes = ['menu-toggle', 'fa'];

  if (props.isOpen) {
    classes.push('fa-times');
    classes.push('menu-toggle_open');
  } else {
    classes.push('fa-bars');
  }

  return (
    <i className={classes.join(' ')} onClick={props.onToggle} />
  );
}

export default MenuToggle;