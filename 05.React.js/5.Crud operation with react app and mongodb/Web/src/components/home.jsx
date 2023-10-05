import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./home.css";
const baseUrl = "http://localhost:3001";

const WeatherCard = ({ item, children }) => {
  return (
    <div className="my-data" id={`post-${item?._id}`}>
      <h1 className="data-title">{item?.title}</h1>
      <p>{item?.text}</p>
      {children}
    </div>
  );
};

const Weather = () => {
  const postInputRef = useRef();
  const bodyInputRef = useRef();
  const [myWeather, setWeather] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  // const Api_KEY = "a26dc0b7cab148668f6744215b44550c";

  useEffect(() => {
    setIsloading(true);
    let myFunction = async () => {
      try {
        let response = await axios.get(`${baseUrl}/api/v1/post`);
        setWeather(response.data);
        console.log(response.data);
        setIsloading(false);
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    };
    myFunction();
  }, [toggleRefresh]);

  const deleteHandler = async (id) => {
    try {
      let response = await axios.delete(`${baseUrl}/api/v1/post/${id}`);
      setAlert(response.data);
      console.log(response.data);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      let response = await axios.post(`${baseUrl}/api/v1/post`, {
        title: postInputRef.current.value,
        text: bodyInputRef.current.value,
      });
      setAlert(response.data);
      console.log(response.data);
      setIsloading(false);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
    // console.log("hello world");
  };

  return (
    <div className="post-title-form">
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="post-title">Post Title</label>
        <input
          type="text"
          id="post-title"
          ref={postInputRef}
          required
          minLength={2}
          maxLength={20}
        />
        <br />
        <label htmlFor="text-body">Post text</label>
        <textarea
          type="text"
          id="text-body"
          ref={bodyInputRef}
          required
          minLength={2}
        ></textarea>
        <br />
        <button className="form-btn" type="submit">
          Get Data
        </button>
      </form>
      <p className="alert-msg">
        {isLoading && "loading..."}
        <br />
        {alert && alert}
      </p>

      {myWeather.map((item, index) => {
        return (
          <WeatherCard item={item} key={index}>
            <button
              className="delete-btn"
              onClick={() => {
                deleteHandler(item._id);
              }}
            >
              Delete
            </button>
            <button className="edit-btn">Edit</button>
          </WeatherCard>
        );
      })}
    </div>
  );
};

export default Weather;
