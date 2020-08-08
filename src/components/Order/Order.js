import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.orderIngredients) {
    // console.log(ingredientName);
    ingredients.push({
      name: ingredientName,
      amount: props.orderIngredients[ingredientName],
    });
  }
  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid gray",
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
