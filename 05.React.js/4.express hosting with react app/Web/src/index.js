import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./App.css";

const WeatherCard = ({ item }) => {
  return (
    <div className="my-data">
      {item.data.map((data, index) => {
        return (
          <div className="weather-card" key={index}>
            <h1>{data.city_name}</h1>
            <h2>{data.weather.description}</h2>
            <h3>{data.temp}°C</h3>
            <h4>{data.datetime}</h4>
          </div>
        );
      })}
    </div>
  );
};

const Weather = () => {
  const inputRef = useRef();
  const [myWeather, setWeather] = useState([]);
  const Api_KEY = "a26dc0b7cab148668f6744215b44550c";

  useEffect(() => {
    const controller = new AbortController();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        console.log(location.coords.latitude, location.coords.longitude);
        try {
          let response = await axios.get(
            `https://api.weatherbit.io/v2.0/current?lat=${location.coords.latitude}&lon=${location.coords.longitude}&key=${Api_KEY}`,
            {
              signal: controller.signal,
            }
          );
          // setWeather([response.data, ...myWeather]);
          setWeather((prev) => {
            return [response.data, ...prev];
          });
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      controller.abort();
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?&key=${Api_KEY}&&city=${inputRef.current.value}`
      );
      setWeather((prev) => [response.data, ...prev]);
      console.log(myWeather);
      inputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
    // console.log("hello world");
  };

  return (
    <div className="callApi-form">
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="callApi">Search Weather</label>
        <input
          type="text"
          id="callApi"
          ref={inputRef}
          required
          minLength={2}
          maxLength={20}
        />
        <button className="form-btn" type="submit">
          Get Data
        </button>
      </form>
      {!myWeather.length ? (
        <h1>loading...</h1>
      ) : myWeather.length === 0 ? (
        <h1> No Data</h1>
      ) : null}
      <div className="card">
        {myWeather.length
          ? myWeather.map((item, index) => {
              return <WeatherCard item={item} key={index} />;
            })
          : null}
      </div>
    </div>
  );
};

ReactDOM.render(<Weather />, document.querySelector("#root"));
