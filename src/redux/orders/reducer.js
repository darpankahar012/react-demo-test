import orderAction from "./action";

const initState = {
  purchasedOrders: [],
};

export default function rootReducer(state = initState, action) {
  switch (action?.type) {
    case orderAction.PURCHASED_ORDER:
      return {
        ...state,
        purchasedOrders: action.purchasedOrders,
      };

    default:
      return state;
  }
}
