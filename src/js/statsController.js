const statsController = (() => {
  const stats = {
    pos: 0,
    islands: {},
    parachutes: 5, // make this an array of parachutes?
    points: 0,
    level: 1,
    levelIncreaseFlag: false,
  };

  function _checkPoints() {
    return !!(stats.points >= 3);
  }

  function _checkCurrentLevel() {
    return _checkPoints() ? _incrementLevel() : false;
  }

  function _incrementLevel() {
    if (stats.levelIncreaseFlag === false) {
      stats.level+=1;
      stats.levelIncreaseFlag = true;
      return true;
    }
    return false;
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
    _checkCurrentLevel();
    console.log('check level', stats);
  }


  return {
    getStats,
    incrementPoints,
    addIsland,
    addParachutes,
    incrementPosition,
    decrementParachute,
    checkScore,
  };
})();

export default statsController;
