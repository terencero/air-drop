import statsCtrl from '../statsController';
import world from '../../world-controller/worldController';
import board from '../stats-board/statsBoardController';

const levelController = {
  
};

function handleLevelChanges() {
  const stats = statsCtrl.getStats();
  if (stats.points < 3 && stats.parachutes.length === 0) {
    return resetLevel();
  }
  return (stats.points >= 3) ? _incrementLevel() : false;

  function _incrementLevel() {
    stats.level+=1;
    _notifyNextLevel();
    world.incrementWind();
    board.displayGameMessage({message: `wind`});
    // stats.updateStats({}).pos = 0;
    return true;
  };
  
  function _notifyNextLevel() {
    const nextLevel = new Event('nextLevel');
    document.querySelector('#stats-board').dispatchEvent(nextLevel);
    board.displayGameMessage({message: `success`});
  };
};

export {handleLevelChanges};