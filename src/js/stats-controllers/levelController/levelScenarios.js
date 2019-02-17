import world from '../../world-controller/worldController';
import board from '../stats-board/statsBoardController'

const scenarios = {
  level1: '',
  level2: {
    changeWorld: world.incrementWind,
    updateBoard: board.displayGameMessage,
  },
};

export {scenarios}