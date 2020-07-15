import React from "react";
import classes from "./Input.css";
const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.Value}
          onChange={props.change}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.Value}
          onChange={props.change}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.Value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} vlaue={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.Value}
          onChange={props.change}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.LAbel}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default Input;
