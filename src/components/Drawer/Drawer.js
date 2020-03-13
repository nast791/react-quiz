import React, {Component} from 'react';
import './Drawer.scss';
import Backdrop from '../Backdrop/Backdrop';
import {NavLink} from "react-router-dom";

const links = [
  {to: '/', label: 'Список', exact: true},
  {to: '/auth', label: 'Авторизация', exact: false},
  {to: '/quiz-creator', label: 'Создать тест', exact: false}
];

class Drawer extends Component {
  renderLinks() {
    return links.map((item, index) => {
      return (
        <li key={index}>
          <NavLink to={item.to} exact={item.exact} activeClassName="active" onClick={this.props.onClose}>{item.label}</NavLink>
        </li>
      )
    })
  }

  render() {
    const classes = ['drawer'];
    if (!this.props.isOpen) {
      classes.push('drawer_close');
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks()} 
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer;