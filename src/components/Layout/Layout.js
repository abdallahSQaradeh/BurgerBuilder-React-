import React, { Component } from "react";
import Aux from "../../hoc/Auxiliray";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  toggleSideDrawerHanfdler = () => {
    this.setState((prev, props) => ({
      showSideDrawer: !prev.showSideDrawer,
    }));
    console.log(this.state.showSideDrawer);
  };
  render() {
    return (
      <Aux>
        <Toolbar clicked={this.toggleSideDrawerHanfdler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
