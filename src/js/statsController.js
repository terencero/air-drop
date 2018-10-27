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
      decrementParachute: _decrementParachute,
    },
  };

  function _checkPoints() {
    return !!(stats.points >= 3);
  }

  function _checkCurrentLevel() {
    return _checkPoints() ? _incrementLevel() : false;
  }

  function _incrementPoints(value) {
    stats.points+=value;
    _checkCurrentLevel();
  };
  
  function _incrementLevel() {
    if (!stats.levelIncreaseFlag) {
      stats.level+=1;
      stats.levelIncreaseFlag = true;
      _displayLevel();
      _displayGameMessage();
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

  function _displayGameMessage() {
    const successMessage = `Congrats! You've made it to the next level!`;
    const failureMessage = `Too bad... Maybe next time. Restart the game? Don't be a quitter!`
    let message = ``;
    let modal = document.createElement(`div`);
    modal.setAttribute(`class`, `message-modal`);
    modal.style.position = `fixed`;
    if (stats.levelIncreaseFlag) {
      message = document.createTextNode(successMessage);
      modal.appendChild(message);
      document.querySelector('.layout').appendChild(modal);
    }
  }
  
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

  function _decrementParachute(payload = 1) {
    stats.parachutes-=payload;
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
    checkScore,
    updateStats,
    initStatsBoard,
  };
})();

export default statsController;
