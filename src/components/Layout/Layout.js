import React, { Component } from "react";
import Aux from "../../hoc/Auxiliray";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          clicked={this.toggleSideDrawerHanfdler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, null)(Layout);
