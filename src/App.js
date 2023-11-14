import { useState } from 'react';
import { useFetchWeather } from './hooks/useFetchWeather';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const { weather, fetchWeather, isFetching, weatherHistory } =
    useFetchWeather();

  return (
    <div className='App'>
      <input
        type='text'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button disabled={isFetching} onClick={() => fetchWeather(country)}>
        Search
      </button>

      <div>
        {weather?.name}, {weather?.temp},
      </div>

      <div>
        {weatherHistory.map((e) => {
          const timestamp = Object.keys(e)[0];
          const date = moment(parseInt(timestamp)).format('D-M-YYYY hh:mma');

          return (
            <div key={timestamp}>
              <p>{e[timestamp].name}</p>
              <p>{date}</p>
            </div>
          );
        })}
      </div>
      <ToastContainer position='bottom-right' theme='dark' />
    </div>
  );
}

export default App;
