import authAction from "./actions";

const initState = {
  loggedIn: false,
  userDetails: {},
};

export default function rootReducer(state = initState, action) {
  switch (action?.type) {
    case authAction.AUTHENTICATION:
      return {
        ...state,
        loggedIn: action.loggedIn,
        userDetails: action.userDetails,
      };

    default:
      return state;
  }
}
