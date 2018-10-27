const statsController = (() => {
  const stats = {
    pos: 0,
    islands: {},
    parachutes: 5, // make this an array of parachutes?
    points: 0,
    level: 1,
    levelIncreaseFlag: false,
    statsActions: {
      incrementPoints: _incrementPoints,
      // _decrementPoints,
      incrementLevel: _incrementLevel,
    },
  };

  function _checkPoints() {
    return !!(stats.points >= 3);
  }

  function _checkCurrentLevel() {
    return _checkPoints() ? _incrementLevel() : false;
  }
  
  function _incrementLevel() {
    if (!stats.levelIncreaseFlag) {
      stats.level+=1;
      stats.levelIncreaseFlag = true;
      _displayLevel();
      return true;
    }
    return false;
  };
  
  function _displayPoints() {
    document.querySelector('.points-container').innerHTML = `points: ${stats.points}`;
  };
  
  function _displayLevel() {
    document.querySelector('.level-container').innerHTML = `level: ${stats.level}`;
  };
  
  function _displayUserName() {
    
  };
  
  function _setNextLevel() {
    return _checkPoints() ? _incrementLevel() : false;
  };

  function getStats() {
    return stats;
  };

  function initStatsBoard() {
    _displayPoints();
    _displayLevel();
  };

  function _incrementPoints(value) {
    stats.points+=value;
    _checkCurrentLevel();
  };

  function addIsland(randomIslands = [{}]) {
    const layout = document.querySelector('.layout');
    stats.islands = randomIslands.reduce((allIslands, island) => {
      allIslands[island.name] = island.value;
      return allIslands;
    }, {});
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

  function updateStats({type, payload}) {
    stats.statsActions[type] ? stats.statsActions[type](payload) : 'action not found';
    _displayPoints();
  }

  function resetGame() {

  };

  return {
    getStats,
    addIsland,
    incrementPosition,
    decrementParachute,
    checkScore,
    updateStats,
    initStatsBoard,
  };
})();

export default statsController;
