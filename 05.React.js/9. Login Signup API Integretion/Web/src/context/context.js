import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const GlobalContext = createContext("Initial Value");
console.log(GlobalContext);
let data = {
  user: {}, // {firstName: "john", lastName: "Doe", email: "xxxxxxxxxxxx"}
  isLogin: null, // true or false
  role: null, // "null" or "admin" or "user"
  darkTheme: true,
  userId: null,
  textAreaValue: null,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
