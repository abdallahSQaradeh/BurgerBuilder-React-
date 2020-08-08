import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxiliray";
import React, { Component } from "react";
const witherrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };
    constructor(props) {
      super(props);
      this.requestInterceotor = axios.interceptors.request.use((req) => {
        this.setState({ error: null }); //we did it here because "ComponentDidMount" will excecute after the child component did mount called so this make an error in our application , so to ensure that we can detect error and enhance it we do it here
        return req;
      });

      // ! in order To remove interceptors we need to restore a reference to the interceptors
      this.responseInterceotor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceotor);
      axios.interceptors.response.eject(this.responseInterceotor);
      //! this preventing memory leaks
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modelClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default witherrorHandler;
/*
 * this higher order component will be used from other components not only BurgerBuilder so in the way ti achive that we will doing some clearing of interceptors after call each component, so wen this component will be unmounted we need to remove all interceptors tat belong to this component
 */
