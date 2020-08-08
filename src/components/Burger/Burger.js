import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";
import { withRouter } from "react-router-dom";
const burger = (props) => {
  let transformedingredients = Object.keys(props.ingredients)
    .map((igkey) => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngredient key={igkey + i} type={igkey} />;
      }); // [,]
    })
    .reduce((prevVal, currentVal) => {
      return prevVal.concat(currentVal);
    }, []);
  if (transformedingredients.length === 0)
    transformedingredients = <p>Please start adding ingredients</p>;

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default withRouter(burger);
