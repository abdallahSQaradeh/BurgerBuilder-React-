import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
    console.log(this.props);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      console.log(this.props.orders);
      orders = this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            orderIngredients={order.ingredients}
            price={+order.price}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
