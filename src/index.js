import world from './js/worldController';
import stats from './js/stats-controllers/statsController'
import airplane from './js/airplaneController';
import parachutes from './js/stats-controllers/parachute-controller/parachuteController';
import parachuteController from './js/stats-controllers/parachute-controller/parachuteController';

console.log('loaded');

const gameController = (() => {
  // TODO: have button on index trigger the gameController
  const flyListener = (() => {
    document.querySelector('#start').addEventListener('click', () => {
      console.log('clicked');
      startGame();
      document.querySelector('button').blur();
      document.querySelector('#start').setAttribute('disabled', true);
      parachuteController.requestParachutes();
      stats.initStatsBoard();
    });
  })();
  
  const resetListener = (() => {
    document.querySelector('#reset').addEventListener('click', () => {
      console.log('reset');
      resetGame();
      document.querySelector('button').blur();
    });
  })();

  const statsBoardContainer = document.querySelector('#stats-board');
  statsBoardContainer.addEventListener('endGame', (e) => {
    pauseGame();
    console.log('received endgame event', e);
  });

  statsBoardContainer.addEventListener('nextLevel', (e) => {
    if (stats.checkScore()) {
      continueToNextLevel();
    }
    console.log('received level up event', e);
  });

  function startGame() {
    world.addIslands({
      island1: {
        value: world.randomIslandGenerator('a').getBoundingClientRect(),
      },
      island2: {
        value: world.randomIslandGenerator('b').getBoundingClientRect(),
      },
      island3: {
        value: world.randomIslandGenerator('c').getBoundingClientRect(),
      },
    });
    airplane.moveAirplane();
  };

  function resetGame() {
    airplane.resetAirplane();
    world.resetWorld();
    stats.resetStats();
    parachutes.resetParachutes();
    document.querySelector('#start').removeAttribute('disabled');
  };

  function continueToNextLevel() {
    airplane.resetAirplane();
    world.resetWorld();
    parachutes.resetParachutes();
    document.querySelector('#start').removeAttribute('disabled');
  };

  function pauseGame() {
    // failed or all levels complete or pause game option
    airplane.pauseAirplane();  
  };
})();


export default gameController;
