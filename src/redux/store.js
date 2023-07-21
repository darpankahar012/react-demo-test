import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import reducers from "./reducers";

import thunk from "redux-thunk";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, routeMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middlewares))
);

export { store, history };
