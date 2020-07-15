import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../ToggleButton/ToggleButton";
const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToggleButton clicked={props.clicked}>MENU</ToggleButton>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
export default toolbar;
