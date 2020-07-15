import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliray";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
  shouldComponentUpdate(nextPrps, nextState) {
    return (
      nextPrps.show !== this.props.show || //* update component when show change
      nextPrps.children !== this.props.children //* update component when children change
    );
  }
  componentDidUpdate() {
    console.log("Modal did update");
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clciked={this.props.modelClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
