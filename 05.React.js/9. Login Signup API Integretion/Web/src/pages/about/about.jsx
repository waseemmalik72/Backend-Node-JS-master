import React, { useContext } from "react";
import { GlobalContext } from "../../context/context";

const About = () => {
  const { state } = useContext(GlobalContext);
  return <p>{JSON.stringify(state)}</p>;
};

export default About;
