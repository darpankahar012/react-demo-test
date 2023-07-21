import { toast } from "react-toastify";

const navigationAction = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  FETCHING: "FETCHING",

  success: (messages) => {
    messages !== "" &&
      toast.success(messages, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    return {
      type: navigationAction.SUCCESS,
      resType: "success",
      message: messages,
      show: true,
      isFetching: false,
    };
  },
  error: (messages) => {
    messages !== "" &&
      toast.error(messages, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    return {
      type: navigationAction.ERROR,
      resType: "error",
      message: messages,
      show: true,
      isFetching: false,
    };
  },
  fetching: (flag) => ({
    type: navigationAction.FETCHING,
    isFetching: flag,
  }),
};

export default navigationAction;
