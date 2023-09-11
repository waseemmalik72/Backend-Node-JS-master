import "./forecast.css";

const Forecast = ({ sun, data }) => {
  return (
    <div className="forecast">
      <h3 className="forecast-heading">7 Day Forecast</h3>
      <div className="seven-day-forecast">
        <div className="days">
          <div className="day">
            <p className="days-list">Today</p>
          </div>
          <div className="description">
            <p className="weather-clr">
              {data ? data[0].weather?.description : "Overcast Cloud"}
            </p>
            {sun}
          </div>
          <div className="temp">
            <p className="temp-degree">{data ? data[0].temp : 31}°C</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="seven-day-forecast">
        <div className="days">
          <div className="day">
            <p className="days-list">Today</p>
          </div>
          <div className="description">
            <p className="weather-clr">
              {data ? data[1].weather?.description : "Overcast Cloud"}
            </p>
            {sun}
          </div>
          <div className="temp">
            <p className="temp-degree">{data ? data[1].temp : 31}°C</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="seven-day-forecast">
        <div className="days">
          <div className="day">
            <p className="days-list">Today</p>
          </div>
          <div className="description">
            <p className="weather-clr">
              {data ? data[2].weather?.description : "Overcast Cloud"}
            </p>
            {sun}
          </div>
          <div className="temp">
            <p className="temp-degree">{data ? data[2].temp : 31}°C</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="seven-day-forecast">
        <div className="days">
          <div className="day">
            <p className="days-list">Today</p>
          </div>
          <div className="description">
            <p className="weather-clr">
              {data ? data[3].weather?.description : "Overcast Cloud"}
            </p>
            {sun}
          </div>
          <div className="temp">
            <p className="temp-degree">{data ? data[3].temp : 31}°C</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="seven-day-forecast">
        <div className="days">
          <div className="day">
            <p className="days-list">Today</p>
          </div>
          <div className="description">
            <p className="weather-clr">
              {data ? data[4].weather?.description : "Overcast Cloud"}
            </p>
            {sun}
          </div>
          <div className="temp">
            <p className="temp-degree">{data ? data[4].temp : 31}°C</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="seven-day-forecast">
        <div className="days">
          <div className="day">
            <p className="days-list">Today</p>
          </div>
          <div className="description">
            <p className="weather-clr">
              {data ? data[5].weather?.description : "Overcast Cloud"}
            </p>
            {sun}
          </div>
          <div className="temp">
            <p className="temp-degree">{data ? data[5].temp : 31}°C</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="seven-day-forecast">
        <div className="days">
          <div className="day">
            <p className="days-list">Today</p>
          </div>
          <div className="description">
            <p className="weather-clr">
              {data ? data[6].weather?.description : "Overcast Cloud"}
            </p>
            {sun}
          </div>
          <div className="temp">
            <p className="temp-degree">{data ? data[6].temp : 31}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
