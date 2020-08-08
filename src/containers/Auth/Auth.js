import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { info } from "autoprefixer";
import { Redirect } from "react-router-dom";
import { checkValidity, updateobject } from "../../shared/utility";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath) {
      this.props.onSetAuthRedirectPath();
    }
  }

  switchAutModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateobject(this.state.controls, {
      [controlName]: updateobject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  render() {
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({ id: key, config: this.state.controls[key] });
    }
    let form = formElementArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          touched={formElement.config.touched}
          shouldValidate={formElement.config.validation}
          invalid={!formElement.config.valid}
          key={formElement.id}
          elementtype={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          Value={formElement.config.value}
          change={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAutModeHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN Out"}
        </Button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAuth: (email, password, isSignUp) => {
      console.log(email, password);
      dispatch(actions.auth(email, password, isSignUp));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
