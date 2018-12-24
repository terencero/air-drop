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
      incrementPosition,
      incrementPoints: _incrementPoints,
      // _decrementPoints,
      incrementLevel: _incrementLevel,
      decrementParachute: _decrementParachute,
      resetLevel,
      addParachute,
    },
  };

  function _checkCurrentLevel() {
    if (!(stats.points >= 3) && stats.parachutes === 0) {
     return resetLevel();
    }
    return (stats.points >= 3) ? _incrementLevel() : false;
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

  function resetLevel() {
    const endGame = new Event('endGame');
    document.querySelector('#stats-board').dispatchEvent(endGame);
    board.displayGameMessage();
    return;
  }

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
    console.log('check level', stats);
    return _checkCurrentLevel();
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
