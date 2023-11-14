import { useState } from 'react';
import { useFetchWeather } from './hooks/useFetchWeather';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import HistoryRow from './components/HistoryRow';

function App() {
  const [country, setCountry] = useState('');
  const {
    weather,
    fetchWeather,
    isLoading,
    weatherHistory,
    deleteWeatherHistory,
  } = useFetchWeather();

  return (
    <div className='app-bg'>
      <div className='input-container'>
        <div className='input-field'>
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          onClick={() => fetchWeather(country)}
          type='button'>
          <img src='/search.png' alt='Search' />
        </button>
      </div>

      <div className='display-container'>
        <div className='today-weather-details'>
          <div className='today-weather-temp-data'>
            <div className='today-weather-title'>Today's Weather</div>
            <div className='today-temp'>{weather?.temp}°</div>
            <div className='today-temp-range'>
              H: {weather?.temp_max}° L: {weather?.temp_min}°
            </div>
            <div className='today-country'>{weather?.name}</div>
          </div>
          <div className='today-weather-other-data'>
            <img
              className='today-weather-icon'
              src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
              alt='weather'
            />
            <div className='today-date'>{weather?.date}</div>
            <div className='today-humidity'>Humidity: {weather?.humidity}%</div>
            <div className='today-weather'>{weather?.weather}</div>
          </div>
        </div>

        <div className='history-container'>
          <h2>Search History</h2>
          {Object.keys(weatherHistory)
            .reverse()
            .map((timestamp) => {
              return (
                <HistoryRow
                  key={timestamp}
                  name={weatherHistory[timestamp].name}
                  date={weatherHistory[timestamp].date}
                  fetchWeather={fetchWeather}
                  isLoading={isLoading}
                  deleteHistory={() => deleteWeatherHistory(timestamp)}
                />
              );
            })}
        </div>
      </div>

      <ToastContainer position='bottom-right' theme='dark' />
    </div>
  );
}

export default App;
