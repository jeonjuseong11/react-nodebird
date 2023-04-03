export const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
};
//redux-thunk
// export const loginAction = (data) => {
//   return (dispatch, getState) => {
//     const state = getState();
//     dispatch(loginRequestAction());
//     axios
//       .post("/api/login")
//       .then((res) => {
//         dispatch(loginSuccessAction(res.data));
//       })
//       .catch((err) => {
//         dispatch(LoginFailureAction(err));
//       });
//   };
// };

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
export const loginSuccessAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
export const LoginFailureAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT",
  };
};
export const logoutSuccessAction = () => {
  return {
    type: "LOG_OUT",
  };
};
export const logoutFailureAction = () => {
  return {
    type: "LOG_OUT",
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.data,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
export default reducer;
