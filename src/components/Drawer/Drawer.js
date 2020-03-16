import React, {Component} from 'react';
import './Drawer.scss';
import Backdrop from '../Backdrop/Backdrop';
import {NavLink} from "react-router-dom";

class Drawer extends Component {
  renderLinks(links) {
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

    const links = [
      {to: '/', label: 'Список', exact: true},
    ];

    if (this.props.isAuth) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
      links.push({to: '/logout', label: 'Выйти', exact: false});
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false});
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer;