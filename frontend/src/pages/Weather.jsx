// import { useState } from "react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
// import "./Weather.css"
// import Layout from "../layout/layout";
// const Weather = () => {
//   const [city, setCity] = useState("")
//   const [weatherData, setWeatherData] = useState(null)

//   const handleSearch = () => {
//     // Simulated data - replace with actual API call
//     setWeatherData({
//       city: "London",
//       country: "GB",
//       current_temp: 18,
//       feels_like: 17,
//       temp_min: 15,
//       temp_max: 20,
//       humidity: 75,
//       description: "partly cloudy",
//       rain_prediction: false,
//       future_temps: [
//         { time: "14:00", value: 19 },
//         { time: "15:00", value: 20 },
//         { time: "16:00", value: 19 },
//         { time: "17:00", value: 18 },
//         { time: "18:00", value: 17 },
//       ],
//       future_humidity: [
//         { time: "14:00", value: 74 },
//         { time: "15:00", value: 73 },
//         { time: "16:00", value: 75 },
//         { time: "17:00", value: 77 },
//         { time: "18:00", value: 78 },
//       ],
//     })
//   }

//   return (
//     <Layout>
//     <div className="weather-dashboard">
//       <div className="dashboard-container">
//         <div className="dashboard-card">
//           <h2 className="dashboard-title">Weather Forecast</h2>
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Enter city name..."
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="search-input"
//             />
//             <button onClick={handleSearch} className="search-button">
//               Search
//             </button>
//           </div>

//           {weatherData && (
//             <div className="weather-content">
//               <div className="weather-grid">
//                 <div className="weather-item">
//                   <div className="weather-icon temperature"></div>
//                   <div>
//                     <p className="weather-label">Temperature</p>
//                     <p className="weather-value">{weatherData.current_temp}°C</p>
//                   </div>
//                 </div>

//                 <div className="weather-item">
//                   <div className="weather-icon humidity"></div>
//                   <div>
//                     <p className="weather-label">Humidity</p>
//                     <p className="weather-value">{weatherData.humidity}%</p>
//                   </div>
//                 </div>

//                 <div className="weather-item">
//                   <div className="weather-icon condition"></div>
//                   <div>
//                     <p className="weather-label">Condition</p>
//                     <p className="weather-value capitalize">{weatherData.description}</p>
//                   </div>
//                 </div>

//                 <div className="weather-item">
//                   <div className="weather-icon rain"></div>
//                   <div>
//                     <p className="weather-label">Rain Prediction</p>
//                     <p className="weather-value">{weatherData.rain_prediction ? "Yes" : "No"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="chart-container">
//                 <h3 className="chart-title">Temperature Forecast</h3>
//                 <div className="chart">
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={weatherData.future_temps}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="time" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="value" stroke="#ef4444" name="Temperature (°C)" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               <div className="chart-container">
//                 <h3 className="chart-title">Humidity Forecast</h3>
//                 <div className="chart">
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={weatherData.future_humidity}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="time" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Humidity (%)" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </Layout>
//   )
// }

// export default Weather;



import axios from 'axios';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Weather.css';
import Layout from '../layout/layout';

const API_KEY = 'e5c8599ea0d4e629b9c4b26806e485cc'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Use 'imperial' for Fahrenheit
        },
      });

      const data = response.data;

      const weatherData = {
        city: data.city.name,
        country: data.city.country,
        current_temp: data.list[0].main.temp,
        feels_like: data.list[0].main.feels_like,
        temp_min: data.list[0].main.temp_min,
        temp_max: data.list[0].main.temp_max,
        humidity: data.list[0].main.humidity,
        description: data.list[0].weather[0].description,
        rain_prediction: data.list[0].rain ? true : false,
        future_temps: data.list.slice(0, 5).map((item) => ({
          time: item.dt_txt.split(' ')[1].substring(0, 5), // Extract time (HH:MM)
          value: item.main.temp,
        })),
        future_humidity: data.list.slice(0, 5).map((item) => ({
          time: item.dt_txt.split(' ')[1].substring(0, 5), // Extract time (HH:MM)
          value: item.main.humidity,
        })),
      };

      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="weather-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h2 className="dashboard-title">Weather Forecast</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button" disabled={loading}>
                {loading ? 'Loading...' : 'Search'}
              </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {weatherData && (
              <div className="weather-content">
                <div className="weather-grid">
                  <div className="weather-item">
                    <div className="weather-icon temperature"></div>
                    <div>
                      <p className="weather-label">Temperature</p>
                      <p className="weather-value">{weatherData.current_temp}°C</p>
                    </div>
                  </div>

                  <div className="weather-item">
                    <div className="weather-icon humidity"></div>
                    <div>
                      <p className="weather-label">Humidity</p>
                      <p className="weather-value">{weatherData.humidity}%</p>
                    </div>
                  </div>

                  <div className="weather-item">
                    <div className="weather-icon condition"></div>
                    <div>
                      <p className="weather-label">Condition</p>
                      <p className="weather-value capitalize">{weatherData.description}</p>
                    </div>
                  </div>

                  <div className="weather-item">
                    <div className="weather-icon rain"></div>
                    <div>
                      <p className="weather-label">Rain Prediction</p>
                      <p className="weather-value">{weatherData.rain_prediction ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                <div className="chart-container">
                  <h3 className="chart-title">Temperature Forecast</h3>
                  <div className="chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weatherData.future_temps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#ef4444" name="Temperature (°C)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-container">
                  <h3 className="chart-title">Humidity Forecast</h3>
                  <div className="chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weatherData.future_humidity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Humidity (%)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Weather;