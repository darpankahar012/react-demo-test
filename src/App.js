import React, { Fragment, useEffect } from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/authentication/Login";
import Index from "./pages/products/products";
import MyProfile from "./pages/profile/MyProfile";
import { compose } from "redux";
import { connect } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import Checkout from "./pages/checkout/Checkout";

function App(props) {
  const { loggedIn, history, userDetails, cartItems, loading, isFetching } =
    props;

  useEffect(() => {
    if (!loggedIn) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isFetching]);
  return (
    <Fragment>
      {history.location.pathname !== "/" ? (
        <Header
          userDetails={userDetails}
          cartItems={cartItems}
          loading={loading}
        />
      ) : null}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Index} />
        <Route exact path="/profile" component={MyProfile} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
      {history.location.pathname !== "/" ? <Footer /> : null}
      <ToastContainer autoClose={2000} />;
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authentication?.loggedIn,
    userDetails: state.authentication?.userDetails,
    cartItems: state.cart.cartItems,
    isFetching: state.navigation.isFetching,
    purchasedOrders: state.orders.purchasedOrders,
  };
};

export default compose(withRouter, connect(mapStateToProps, null))(App);
