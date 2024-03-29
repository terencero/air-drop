import board from './stats-board/statsBoardController';
import {handleLevelChanges} from './levelController/levelController';

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
      incrementPoints,
      decrementParachute: _decrementParachute,
      resetLevel,
    },
  };

  function incrementPoints(value) {
    stats.points+=value;
    handleLevelChanges();
  };

  function _decrementParachute(payload = 1) {
    stats.parachutes-=payload;
    boards.updateBoard();
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
    // return stats.statsActions;
  };

  function resetBoardNextLevel() {
    stats.points = 0;
    board.clearBoard();
  };

  function resetStats() {
    // TODO: what should this control?
    stats.pos = 0;
    // stats.parachutes = {};
    stats.points = 0;
    stats.level = 1;
    stats.levelIncreaseFlag = false;
    board.updateBoard();
    board.clearBoard();
  };

  return {
    getStats,
    checkScore,
    updateStats,
    initStatsBoard,
    resetStats,
    resetBoardNextLevel,
  };
})();

export default statsController;
