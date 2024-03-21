export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      if (
        action.payload?.firstName &&
        action.payload?.lastName &&
        action.payload?.email
      ) {
        let role = action.payload.isAdmin ? "admin" : "user";
        let user = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          userId: action.payload._id,
        };
        console.log(action.payload);
        return { ...state, isLogin: true, role: role, user: user };
      }
      break;
    }

    case "USER_LOGOUT": {
      return { ...state, isLogin: false, role: null, user: {} };
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
