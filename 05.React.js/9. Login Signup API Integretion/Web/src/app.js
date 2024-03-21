import React from "react";
import MyRouter from "./router";
import ContextProvider from "./context/context";
function App() {
  return (
    <ContextProvider>
      <MyRouter />
    </ContextProvider>
  );
}
export default App;
