const worldController = (() => {
  const world = {
    weather: {
      wind: 0,
    },
    islands: {},
  };

  function getWind() {
    return world.weather.wind;
  };

  function incrementWind() {
    world.weather.wind+=1;
  };

  function getWorld() {
    return world;
  }

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

  function addIslands(randomIslands = [{}]) {
    const layout = document.querySelector('.layout');
    return Promise.resolve(
      world.islands = Object.keys(randomIslands).reduce((islandAcc, island) => {
        islandAcc[island] = randomIslands[island].value;
        return islandAcc;
      }, {})
    );
  };

  function removeIslands() {
    const containers = document.querySelectorAll('.island-container');
    containers.forEach(container => container.removeChild(document.querySelector('.island-small')));
    return world.islands = {};
  };

  return {
    getWorld,
    incrementWind,
    getWind,
    randomIslandGenerator,
    addIslands,
    removeIslands,
  }
})();

export default worldController;
