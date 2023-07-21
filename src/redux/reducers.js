import { combineReducers } from "redux";

import authentication from "./auth/reducer";
import navigation from "./navigation/reducer";
import cart from "./cart/reducer";
import orders from "./orders/reducer";

export default combineReducers({
  authentication,
  navigation,
  cart,
  orders,
});
