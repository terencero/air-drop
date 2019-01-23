import world from './js/stats-controllers/world-controller/worldController';
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
      // world.createWorld();
      startGame();
      document.querySelector('button').blur();
      document.querySelector('#start').setAttribute('disabled', true);
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
    continueToNextLevel();
    console.log('received level up event', e);
  });
  
  function startGame() {
    stats.resetBoardNextLevel();
    world.createWorld();
    airplane.moveAirplane();
    parachuteController.requestParachutes();
    stats.initStatsBoard();
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
