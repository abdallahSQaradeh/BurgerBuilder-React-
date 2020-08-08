import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../CheckOut/ContactData/ContactData";
import { connect } from "react-redux";
class CheckOut extends Component {
  checkOutCancelled = () => {
    this.props.history.goBack();
  };
  checkOutContinued = () => {
    //console.log(this.props.match.path + "/contact-data");
    this.props.history.replace("/check-out/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckOutSummary
            ingredients={this.props.ings}
            checkOutCancelled={this.checkOutCancelled}
            checkOutContinued={this.checkOutContinued}
          />

          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(CheckOut);
