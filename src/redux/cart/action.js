const cartActions = {
  CART: "CART",

  cartData: (data) => {
    return {
      type: cartActions.CART,
      cartItems: data,
    };
  },
};

export default cartActions;
