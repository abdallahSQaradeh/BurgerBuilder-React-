import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route } from "react-router-dom";
import ContactData from "../CheckOut/ContactData/ContactData";
import { connect } from "react-redux";
class CheckOut extends Component {
  checkOutCancelled = () => {
    this.props.history.goBack();
  };
  checkOutContinued = () => {
    console.log(this.props.match.path + "/contact-data");
    this.props.history.replace("/check-out/contact-data");
  };

  render() {
    return (
      <div>
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
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};
export default connect(mapStateToProps)(CheckOut);
