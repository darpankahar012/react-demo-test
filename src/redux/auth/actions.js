const authActions = {
  AUTHENTICATION: "AUTHENTICATION",

  isLogin: (value, data) => {
    return {
      type: authActions.AUTHENTICATION,
      loggedIn: value,
      userDetails: data,
    };
  },
};

export default authActions;
