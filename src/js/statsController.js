const statsController = (() => {
  const stats = {
    pos: 0,
    islands: {},
    parachutes: 5, // make this an array of parachutes?
    points: 0,
    level: 1,
  };

  function _checkPoints() {

  }

  function _checkCurrentLevel() {

  }

  function _incrementLevel() {
    stats.level+=1;
  };

  function getStats() {
    return stats;
  };

  function incrementPoints(value) {
    stats.points+=value;
  };

  function addIsland(randomIslands = [{}]) {
    const layout = document.querySelector('.layout');
    stats.islands = randomIslands.reduce((allIslands, island) => {
      allIslands[island.name] = island.value;
      return allIslands;
    }, {});
  };

  function addParachutes(parachute) {
    stats.parachutes.push(parachute);
  };

  function incrementPosition(value) {
    stats.pos+=value;
  };

  function decrementParachute() {
    stats.parachutes-=1;
  };

  function checkScore() {
    if ()
  }


  return {
    getStats,
    incrementPoints,
    addIsland,
    addParachutes,
    incrementPosition,
    decrementParachute,
    incrementLevel,
  };
})();

export default statsController;
