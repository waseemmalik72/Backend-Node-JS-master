export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      if (
        action.payload?.firstName &&
        action.payload?.lastName &&
        action.payload?.email
      ) {
        let role = action.payload.isAdmin ? "admin" : "user";
        let firstName = action.payload.firstName;
        let lastName = action.payload.lastName;
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        let user = {
          firstName: firstName,
          lastName: lastName,
          email: action.payload.email,
        };
        console.log(action.payload);
        return {
          ...state,
          isLogin: true,
          role: role,
          user: user,
          userId: action.payload._id,
        };
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

    case "CHANGE_VALUE": {
      if (action.value.length === 0) {
        return { ...state, textAreaValue: null };
      } else {
        return { ...state, textAreaValue: action.value };
      }
    }

    default: {
      return state;
    }
  }
};
