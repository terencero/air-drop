import board from './statsBoardController';
import world from './world-controller/worldController';
import statsBoardController from './statsBoardController';

const statsController = (() => {
  // TODO: just make this into an object and compose with smaller control modules?
  const stats = {
    pos: 0,
    parachutes: {},
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
    },
  };

  function _checkCurrentLevel() {
    if (!(stats.points >= 3) && stats.parachutes.length === 0) {
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
    statsBoardController.updateBoard();
  };
  
  function _incrementLevel() {
    stats.level+=1;
    _notifyNextLevel();
    world.incrementWind();
    stats.pos = 0;
    return true;
  };
  
  function _notifyNextLevel() {
    const nextLevel = new Event('nextLevel');
    document.querySelector('#stats-board').dispatchEvent(nextLevel);
    board.displayGameMessage({message: `success`});
  };

  function getStats() {
    return stats;
  };

  function resetLevel() {
    const endGame = new Event('endGame');
    document.querySelector('#stats-board').dispatchEvent(endGame);
    board.displayGameMessage({message: `failure`});
    return;
  }

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
    // TODO: what should this control?
    stats.pos = 0;
    // stats.parachutes = {};
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
    resetLevel,
  };
})();

export default statsController;
