import navigationAction from "./action";

const initState = {
  show: false,
  message: "",
  isFetching: false,
};

export default function rootReducer(state = initState, action) {
  switch (action?.type) {
    case navigationAction.SUCCESS:
      return {
        ...state,
        show: action.show,
        message: action.message,
        isFetching: action.isFetching,
      };

    case navigationAction.ERROR:
      return {
        ...state,
        show: action.show,
        message: action.message,
        isFetching: action.isFetching,
      };

    case navigationAction.FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
}
