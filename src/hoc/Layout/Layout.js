import React, {Component} from 'react';
import './Layout.scss';
import MenuToggle from "../../components/MenuToggle/MenuToggle";
import Drawer from "../../components/Drawer/Drawer";

export default class Layout extends Component {
  state = {
    menu: false
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu
    }));
  }

  menuClose = () => {
    this.setState({
      menu: false
    });
  }

  render() {
    return(
      <div className="layout">
        <Drawer isOpen={this.state.menu} onClose={this.menuClose}/>
        <MenuToggle onToggle={this.toggleMenu} isOpen={this.state.menu}/>
        <main className="layout__main">
          { this.props.children }
        </main>
      </div>
    )
  }
}