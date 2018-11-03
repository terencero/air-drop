import stats from './statsController';

const worldController = (() => {
  const weather = {
    wind: 0,
  };

  function getWind() {
    return weather.wind;
  };

  function incrementWind() {
    weather.wind+=1;
  };

  return {
    incrementWind,
    getWind,
  }
})();

export default worldController;
