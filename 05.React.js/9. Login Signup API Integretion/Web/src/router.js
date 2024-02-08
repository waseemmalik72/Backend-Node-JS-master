import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import Chat from "./pages/chat/chat";
import Signup from "./pages/signup/signup";
import Signin from "./pages/signin/signin";
import { GlobalContext } from "./context/context";
const MyRouter = () => {
  const { state } = useContext(GlobalContext);
  console.log(state);
  return (
    <div>
      <BrowserRouter>
        <Layout>
          {state.isLogin ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="*"
                element={<Navigate to="/signin" replace={true} />}
              />
            </Routes>
          )}
        </Layout>
      </BrowserRouter>
    </div>
  );
};
export default MyRouter;
