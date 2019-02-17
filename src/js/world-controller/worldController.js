import randomIslandGenerator from './islandGenerator';

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

  function resetWind() {
    world.weather.wind = 0;
  }

  function incrementWind() {
    world.weather.wind-=.1;
  };

  function getWorld() {
    return world;
  };

  function addIslands() {
    const islands = {
      island1: {
        value: randomIslandGenerator('a').getBoundingClientRect(),
      },
      island2: {
        value: randomIslandGenerator('b').getBoundingClientRect(),
      },
      island3: {
        value: randomIslandGenerator('c').getBoundingClientRect(),
      },
    }
    
    return world.islands = Object.keys(islands).reduce((islandAcc, island) => {
      islandAcc[island] = islands[island].value;
      return islandAcc;
    }, {});
  };

  function removeIslands() {
    const islands = document.querySelectorAll('.island-small');
    if (islands.length > 0) {
      islands.forEach((island) => {
        island.parentNode.removeChild(document.querySelector('.island-small'))
      });
    }
    world.islands = {};
  };

  function resetWorld() {
    removeIslands();
    resetWind();
  }

  function createWorld() {
    addIslands();
  }

  function nextLevelWorld() {
    
  }

  return {
    getWorld,
    incrementWind,
    getWind,
    addIslands,
    removeIslands,
    resetWorld,
    createWorld,
  }
})();

export default worldController;
