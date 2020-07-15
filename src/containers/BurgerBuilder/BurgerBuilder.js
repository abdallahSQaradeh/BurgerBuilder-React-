import React, { Component } from "react";
import Aux from "../../components/Layout/Layout";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import burger from "../../components/Burger/Burger";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }
  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("https://burgerreact-5ab9d.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPRice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPRice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPRice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPRice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      ); // ? encode elements so that can be used in url
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    console.log(queryString, queryParams);
    this.props.history.push({
      pathname: "./check-out",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ing,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );
    console.log(this.props);
    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            purchasable={this.state.purchasable}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseCnacelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div width="70%">
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.ingredients,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGERDIENT, ingredientName: ingName }),
    onRemoveIngredient: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
