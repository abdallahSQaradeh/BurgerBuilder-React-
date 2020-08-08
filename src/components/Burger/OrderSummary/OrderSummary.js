import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliray";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  componentDidUpdate() {
    // console.log("order summary did ipdate");
  }
  render() {
    this.ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}:</span>{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p> A delicous burger with the following ingredients:</p>
        <ul>{this.ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}</strong>
          <span style={{ color: "green" }}>{"$ "}</span>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.purchaseCnacelled} btnType={"Danger"}>
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinue} btnType={"Success"}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}
export default OrderSummary;
