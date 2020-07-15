import React, { Component } from "react";
import classes from "./BurgerIngredient.css";
import PropTypes from "prop-types";
class BurgerIngredient extends Component {
  render() {
    let ingreadient = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingreadient = <div className={classes.BreadBottom}></div>;
        break;
      case "bread-top":
        ingreadient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingreadient = <div className={classes.Meat}></div>;
        break;
      case "cheese":
        ingreadient = <div className={classes.Cheese}></div>;
        break;
      case "salad":
        ingreadient = <div className={classes.Salad}></div>;
        break;
      case "bacon":
        ingreadient = <div className={classes.Bacon}></div>;
        break;
      default:
        ingreadient = null;
    }
    return ingreadient;
  }
}
BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};
export default BurgerIngredient;
