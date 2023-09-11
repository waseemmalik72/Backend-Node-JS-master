import "./weather.css";

const WeatherCard = ({ data, sun }) => {
  return (
    <div className="weather-card">
      <div className="weather-card-box">
        <div className="country-name">
          <h1 className="country">{data?.city_name}</h1>
          <h1 className="temp">{data?.data[0]?.temp}°C</h1>
        </div>
        <div className="weather-icon">{sun}</div>
      </div>
    </div>
  );
};

export default WeatherCard;
