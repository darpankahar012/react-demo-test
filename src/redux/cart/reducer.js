import cartAction from "./action";

const initState = {
  cartItems: [],
};

export default function rootReducer(state = initState, action) {
  switch (action?.type) {
    case cartAction.CART:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
}
