import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route } from "react-router-dom";
import ContactData from "../CheckOut/ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingredients: { salad: 1, meat: 1, bacon: 1, cheese: 1 },
    price: 0,
  };

  checkOutCancelled = () => {
    this.props.history.goBack();
  };
  checkOutContinued = () => {
    console.log(this.props.match.path + "/contact-data");
    this.props.history.replace("/check-out/contact-data");
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const _ingredients = {};
    let entries = query.entries();
    let price = 0;
    for (let [key, value] of query.entries()) {
      console.log(key, value);
      if (key === "price") {
        price = value;
      } else _ingredients[key] = +value;
    }
    this.setState({ ingredients: _ingredients, price: price });
  }
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          checkOutCancelled={this.checkOutCancelled}
          checkOutContinued={this.checkOutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default CheckOut;
