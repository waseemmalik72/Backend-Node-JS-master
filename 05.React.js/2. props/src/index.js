import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import profileImg from "./profile.jpg";
import shaji from "./shaji.jpg";
import imti from "./imti.jpg";
import {
  HandThumbsUp,
  ChatLeftText,
  ShareFill,
  // CodeSlash,
} from "react-bootstrap-icons";
import "./App.css";

const Post = ({ img, title, text, postImg, date }) => {
  return (
    <div className="main-div">
      <div className="post">
        <div className="post-header">
          <div className="profile-img">
            <img
              className="my-img"
              src={img}
              width={70}
              height={70}
              alt="Profile-img"
            />
          </div>
          <div className="post-info">
            <div className="post-name">
              <h1>{title}</h1>
            </div>
            <div className="post-date">{date}</div>
          </div>
        </div>

        <div className="post-body">
          <p className="post-text">{text}</p>
        </div>

        <hr className="under-line" />

        <div className="post-img">
          <img src={postImg} alt="" />
        </div>

        <hr className="under-line" />

        <div className="post-footer">
          <div className="button">
            {" "}
            <HandThumbsUp />
            Like
          </div>
          <div className="button">
            <ChatLeftText /> Comment
          </div>
          <div className="button">
            <ShareFill /> Share
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <div>
    <Post
      img={profileImg}
      date="09-08-2023"
      title="Waseem Malik"
      text="Just Funny Post 🤣😂😂🤣
  Don't Be personally"
      postImg="https://scontent.fkhi12-1.fna.fbcdn.net/v/t39.30808-6/347410141_571067598507260_1966770028677316375_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeF-lXKIIEIzcb-r4rhNQO67ptdXywK4tham11fLAri2FrUYfsr7zILZik5B42JsIl3rzK0qLm6w0IytgyBND4_n&_nc_ohc=rs1E4Q0MP1wAX-GXTbq&_nc_oc=AQnlf153Qhw5QMDcNZkdGUZeDFPyw5GAwGKffTx7Akz3soIaKZ24pm5oNDi6rE--owQ&_nc_ht=scontent.fkhi12-1.fna&oh=00_AfBTEIFSLJanVy9cbrvn0qt1bfwnIpDKu1iiR-9T6OqNeg&oe=64FE63D9"
    />
    <Post
      img={shaji}
      date="05-04-2023"
      title="Sharjeel Shah"
      text="🤣🤣🤣🤣😂😂😂"
      postImg="https://scontent.fkhi12-1.fna.fbcdn.net/v/t39.30808-6/363008886_950812119507025_1279358659735326365_n.jpg?stp=dst-jpg_p180x540&_nc_cat=101&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeESDuxIEmNL7FM4WGeJJyloHM-cRuX9_Ugcz5xG5f39SFD4e9bJwjKyvQPA-gdg6aPvfuLoQtglFtgnP-69Jv8I&_nc_ohc=CiaAJo3sBccAX8_RYzA&_nc_ht=scontent.fkhi12-1.fna&oh=00_AfDWwyvrnSWFthCmeUYLrRPT6etXISzELboYbDGfuZEsIg&oe=64FECA9F"
    />
    <Post
      img={imti}
      date="07-06-2023"
      title="Imtiaz Ali"
      text="😂😂🤣🤣"
      postImg="https://scontent.fkhi12-1.fna.fbcdn.net/v/t39.30808-6/345562013_926720715252549_1565968124477695456_n.jpg?stp=dst-jpg_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeHS0KF3wx1KUOULw89yj42Y7v3Ry_FHKCfu_dHL8UcoJ7gw1LR0B20eJgoqwsB8JrjUG9F9AcZXRHTtKIS0QX9d&_nc_ohc=qkK7_kgp1NYAX8m4jhU&_nc_ht=scontent.fkhi12-1.fna&oh=00_AfDPm4B8IDdBYxnpyxcy8hC0ZfyAkxU85dYEATwU7AUzsQ&oe=64FEA7AF"
    />
  </div>,
  document.querySelector("#root")
);

const Counter = () => {
  const [isLit, setLit] = useState(6);

  const addClick = async () => {
    await setLit(isLit + 1);

    console.log(isLit);
  };
  const subClick = () => {
    // setLit("waseem")
    setLit(isLit - 1);
  };

  return (
    <div className="main-div">
      <button className="" onClick={subClick}>
        {" "}
        Click Me
      </button>
      <p>{isLit}</p>
      <button onClick={addClick}> Click Me</button>
    </div>
  );
};

ReactDOM.render(<Counter />, document.querySelector("#root"));

const Room = ({ myClass }) => {
  const [isLit, setLit] = React.useState(true);

  return (
    <div className={`room ${isLit ? "lit" : "dark"}`}>
      the room is
      <br />
      <button onClick={() => setLit(!isLit)}>flip</button>
    </div>
  );
};

ReactDOM.render(<Room />, document.querySelector("#root"));

const MyComponent = () => {
  const [isLit, setLit] = useState("nadeem");

  useEffect(() => {
    console.log("hello world");
  }, [isLit]);

  const submitHandler = () => {
    setLit((prev) => `${prev} waseem`);
  };

  return (
    <div className="main-div">
      <button className="btn" onClick={submitHandler}>
        Click me
      </button>
      <h1>{isLit}</h1>
    </div>
  );
};

ReactDOM.render(<MyComponent />, document.querySelector("#root"));

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        console.log(location.coords.latitude, location.coords.longitude);
        try {
          let response = await axios.get(
            `https://api.weatherbit.io/v2.0/current?lat=${location.coords.latitude}&lon=${location.coords.longitude}&key=${Api_KEY}`
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

// function Card({ imti, children }) {
//   return (
//     <div className="card">
//       <img src={imti} alt="" />
//       {children}
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <Card imti={imti}>
//         <p>hello bhai kaise ho</p>
//       </Card>
//       <p>me app wala children props ho</p>
//     </div>
//   );
// }

// ReactDOM.render(
//   <App />,
//   document.querySelector("#root"))
