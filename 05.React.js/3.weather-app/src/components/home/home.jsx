import { useRef, useState } from "react";
import "./home.css";
import axios from "axios";
import WeatherCard from "../weatherwidgets/weather";
import Forecast from "../sevendayforecast/forecast";
import {
  MapFill,
  Wind,
  CloudSun,
  Sliders2,
  BlockquoteLeft,
  SunFill,
  ThermometerSun,
  DropletFill,
  Flower3,
} from "react-bootstrap-icons";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weekForecast, setWeekForecast] = useState(null);
  const refInput = useRef();
  const getWeatherData = async (e) => {
    e.preventDefault();

    const API_key = "a26dc0b7cab148668f6744215b44550c";
    const city = refInput.current.value;
    console.log(city);

    try {
      let sevenDayResponse = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city.toLowerCase()}&days=${7}&key=${API_key}`
      );
      setWeatherData(sevenDayResponse.data);
      setWeekForecast(sevenDayResponse?.data?.data);
      refInput.current.value = " ";
      console.log(sevenDayResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-box">
        <div className="side-bar">
          <div className="side-detail">
            <div className="wind">
              <Wind className="wind-size" />
            </div>
            <div className="wind">
              <CloudSun className="size" style={{ color: "#f0f0f2" }} />
              <p
                className="side-para"
                style={{ fontWeight: "900", color: "#b5bbc4" }}
              >
                Weather
              </p>
            </div>
            <div className="wind">
              <BlockquoteLeft className="size" />
              <p className="side-para">Cities</p>
            </div>
            <div className="wind">
              <MapFill className="size" />
              <p className="side-para">Map</p>
            </div>
            <div className="wind">
              <Sliders2 className="size" />
              <p className="side-para">Settings</p>
            </div>
          </div>
        </div>
        <form onSubmit={getWeatherData} className="weather-form">
          <div className="center-weather-data">
            <div className="weather-input">
              <label htmlFor="weather-input" className="weather-label"></label>
              <input
                id="weather-input"
                type="text"
                placeholder="Enter City"
                required
                minLength={2}
                maxLength={20}
                ref={refInput}
              />
            </div>
            <div
              style={{ height: "240px", marginTop: "25px" }}
              className="current-data"
            >
              {weatherData ? (
                <WeatherCard
                  sun={<SunFill className="temp-sun" />}
                  data={weatherData}
                />
              ) : (
                <p className="no-data">...No Data</p>
              )}
            </div>
            <div className="today-forecast">
              <div className="today-weather">
                <h4 className="today-heading">Today's Forecast</h4>
                <div className="hour-detail">
                  <div className="today-hour-update">
                    <div className="forecast-time">
                      <p className="time">6:00 AM</p>
                    </div>
                    <div className="temp">
                      <SunFill className="yellow" />
                      <p className="temp-data">26°C</p>
                    </div>
                  </div>
                  <div className="vr-line"></div>
                  <div className="today-hour-update">
                    <div className="forecast-time">
                      <p className="time">9:00 AM</p>
                    </div>
                    <div className="temp">
                      <SunFill className="yellow" />
                      <p className="temp-data">26°C</p>
                    </div>
                  </div>
                  <div className="vr-line"></div>
                  <div className="today-hour-update">
                    <div className="forecast-time">
                      <p className="time">12:00 PM</p>
                    </div>
                    <div className="temp">
                      <SunFill className="yellow" />
                      <p className="temp-data">26°C</p>
                    </div>
                  </div>
                  <div className="vr-line"></div>
                  <div className="today-hour-update">
                    <div className="forecast-time">
                      <p className="time">3:00 PM</p>
                    </div>
                    <div className="temp">
                      <SunFill className="yellow" />
                      <p className="temp-data">26°C</p>
                    </div>
                  </div>
                  <div className="vr-line"></div>
                  <div className="today-hour-update">
                    <div className="forecast-time">
                      <p className="time">6:00 PM</p>
                    </div>
                    <div className="temp">
                      <SunFill className="yellow" />
                      <p className="temp-data">26°C</p>
                    </div>
                  </div>
                  <div className="vr-line"></div>
                  <div className="today-hour-update">
                    <div className="forecast-time">
                      <p className="time">9:00 PM</p>
                    </div>
                    <div className="temp">
                      <SunFill className="yellow" />
                      <p className="temp-data">26°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="air-condition">
              <div className="air-condition-box">
                <div className="air-condition-header">
                  <h4 className="air-heading">Air Conditions</h4>
                  <button className="see-more-btn">See More</button>
                </div>
                <div className="air-condition-body">
                  <div className="part-one">
                    <div className="box-one">
                      <ThermometerSun className="icon" />
                      <div className="temp">
                        <p className="text">Real Feel</p>
                        <p className="degree">26°</p>
                      </div>
                    </div>
                    <div className="box-one">
                      <Wind className="icon" />
                      <div className="temp">
                        <p className="text">Wind</p>
                        <p className="degree">
                          {weatherData ? weatherData?.data[0]?.wind_spd : "0.5"}
                          km/h
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="part-one">
                    <div className="box-one">
                      <DropletFill className="icon" />
                      <div className="temp">
                        <p className="text">Chance of Rain</p>
                        <p className="degree">0%</p>
                      </div>
                    </div>
                    <div className="box-one">
                      <Flower3 className="icon" />
                      <div className="temp">
                        <p className="text">UV index</p>
                        <p className="degree">
                          {weatherData ? weatherData?.data[0]?.uv : "9"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="right-side-content">
          <div className="right-side-bar">
            <Forecast
              data={weekForecast}
              sun={<SunFill className="yellow" />}
            />
          </div>
        </div>
      </div>
      {/* {weatherData.length
        ? weatherData.map((eachWeatherData, index) => {
            return <WeatherCard key={index} weatherData={eachWeatherData} />;
          })
        : "no data"} */}
    </div>
  );
};

export default Home;
