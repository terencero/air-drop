import world from '../../world-controller/worldController';
import board from '../stats-board/statsBoardController'

const scenarios = {
  level1: '',
  level2: function(levelMessage) {
    world.incrementWind();
    board.displayGameMessage({message: levelMessage || 'wind'});
  },
  level3: function(levelMessage) {
    world.incrementWind();
    
  },
};

export {scenarios}