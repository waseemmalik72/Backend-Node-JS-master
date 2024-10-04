import React, { useEffect } from "react";
import MyRouter from "./router";
import ContextProvider from "./context/context";
import axios from "axios";
function App() {
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        // console.log(config);
        config.withCredentials = true;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <ContextProvider>
      <MyRouter />
    </ContextProvider>
  );
}
export default App;
