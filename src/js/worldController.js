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

  function randomIslandGenerator(val){
    const island = document.createElement('div');
    const refNode = document.querySelector(`.island-container.${val}`);
    const gridPositions = {
      1: 'start',
      2: 'center',
      3: 'end',
    };
    island.className = 'island-small';
    island.style.width = `50px`;
    island.style.height = `20px`;
    island.style.backgroundColor = 'green';
    island.style.alignSelf = `end`;
    island.style.justifySelf = `${gridPositions[Math.floor(Math.random() * 3) + 1]}`;
    island.style.bottom = `0`;
    refNode.appendChild(island);
    return island;
  };

  return {
    incrementWind,
    getWind,
    randomIslandGenerator,
  }
})();

export default worldController;
