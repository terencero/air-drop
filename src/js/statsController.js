import board from './statsBoardController';
import world from './worldController';

const statsController = (() => {
  const stats = {
    pos: 0,
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

  function _decrementParachute(payload = 1) {
    stats.parachutes-=payload;
  };
  
  function _incrementLevel() {
    if (!stats.levelIncreaseFlag) {
      stats.level+=1;
      stats.levelIncreaseFlag = true;
      board.displayGameMessage();
      _setNextLevel();
      world.incrementWind();
      return true;
    }
    return false;
  };
  
  function _setNextLevel() {
    const nextLevel = new Event('nextLevel');
    document.querySelector('#stats-board').dispatchEvent(nextLevel);
    stats.pos = 0;
    stats.parachutes = 5;
    stats.points = 0;
    stats.levelIncreaseFlag = false;
  };

  function getStats() {
    return stats;
  };

  function initStatsBoard() {
    board.updateBoard();
  };

  function incrementPosition(value) {
    stats.pos+=value;
  };

  function checkScore() {
    _checkCurrentLevel();
    console.log('check level', stats);
  };

  function updateStats({type, payload}) {
    stats.statsActions[type] ? stats.statsActions[type](payload) : 'action not found';
    board.updateBoard();
  };

  function resetStats() {
    stats.pos = 0;
    stats.parachutes = 5;
    stats.points = 0;
    stats.level = 1;
    stats.levelIncreaseFlag = false;
    board.updateBoard();
  };

  return {
    getStats,
    incrementPosition,
    checkScore,
    updateStats,
    initStatsBoard,
    resetStats,
  };
})();

export default statsController;
