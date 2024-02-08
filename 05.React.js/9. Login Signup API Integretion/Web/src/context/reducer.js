export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      console.log(state);
      return { ...state, isLogin: true };
    }
    case "USER_LOGOUT": {
      console.log(state);
      return { ...state, isLogin: false };
    }
    case "CHANGE_THEME": {
      return { ...state, darkTheme: !state.darkTheme };
    }
    case "CHANGE_NAME": {
      return { ...state, darkTheme: !state.darkTheme };
    }
    default: {
      return state;
    }
  }
};
