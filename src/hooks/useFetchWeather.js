import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const saveWeatherHistory = (weatherData) => {
  const timestamp = Date.now();
  const history =
    JSON.parse(localStorage.getItem('merq-weather-history')) || {};

  history[timestamp] = weatherData;

  localStorage.setItem('merq-weather-history', JSON.stringify(history));
};

const formatResponse = (json) => {
  const timestamp = Date.now();
  const date = moment(parseInt(timestamp)).format('D-M-YYYY hh:mma');
  return {
    resultForDisplay: {
      name: `${json.name}, ${json.sys.country}`,
      weather: json.weather[0].main,
      temp: json.main.temp,
      temp_min: json.main.temp_min,
      temp_max: json.main.temp_max,
      humidity: json.main.humidity,
      date: date,
      icon: json.weather[0].icon,
    },
    resultForHistory: {
      name: `${json.name}, ${json.sys.country}`,
      date: date,
    },
  };
};

export const useFetchWeather = () => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [weatherHistory, setWeatherHistory] = useState(
    JSON.parse(localStorage.getItem('merq-weather-history')) || {}
  );

  const saveWeatherHistory = (weatherData) => {
    const timestamp = Date.now();
    const history =
      JSON.parse(localStorage.getItem('merq-weather-history')) || {};

    history[timestamp] = weatherData;

    localStorage.setItem('merq-weather-history', JSON.stringify(history));
    setWeatherHistory({ ...history });
  };

  const deleteWeatherHistory = (timestampKey) => {
    delete weatherHistory[parseInt(timestampKey)];

    localStorage.setItem(
      'merq-weather-history',
      JSON.stringify(weatherHistory)
    );
    setWeatherHistory({ ...weatherHistory });
  };

  const fetchWeather = async (country, firstLoad = false) => {
    if (!country) {
      toast.error('Plese enter a valid country');
      return;
    }
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric
      `;

    const toastId = toast.loading(`Fetching weather for ${country}`);

    const response = await fetch(url);

    const json = await response.json();

    if (json.cod === '400' || json.cod === '401' || json.cod === '404') {
      toast.update(toastId, {
        render: json.message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    } else {
      const { resultForDisplay, resultForHistory } = formatResponse(json);
      if (!firstLoad) saveWeatherHistory(resultForHistory);
      setWeather(resultForDisplay);

      toast.update(toastId, {
        render: `${country}'s weather fetched successful 👌`,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchWeather('Singapore', true);
  }, []);

  return {
    weather,
    fetchWeather,
    isLoading,
    weatherHistory,
    deleteWeatherHistory,
  };
};
