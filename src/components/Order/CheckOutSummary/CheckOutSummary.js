import React, { useEffect } from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummary.css";
const checkOutSummary = (props) => {
  useEffect(() => {
    // console.log(props);
  });
  return (
    <div className={classes.CheckOutSummary}>
      <h1>We hope it tastes wull!</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkOutCancelled}>
        Cancel{" "}
      </Button>
      <Button btnType="Success" clicked={props.checkOutContinued}>
        Continue{" "}
      </Button>
    </div>
  );
};
export default checkOutSummary;
