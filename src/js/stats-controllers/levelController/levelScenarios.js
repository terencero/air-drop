import world from '../../world-controller/worldController';
import board from '../stats-board/statsBoardController'

const scenarios = {
  level1: '',
  level2: function({levelMessage = 'wind'} = {}) {
    world.incrementWind();
    board.displayGameMessage({message: levelMessage});
  },
  level3: function({levelMessage = '', windValue = .2} = {}) {
    world.incrementWind(windValue);
  },
};

export {scenarios}