import world from './js/worldController';
import stats from './js/statsController'
import airplane from './js/airplaneController';
import parachutes from './js/parachuteController';

console.log('loaded');

const gameController = (() => {
  // TODO: have button on index trigger the gameController
  const flyListener = (() => {
    document.querySelector('#start').addEventListener('click', () => {
      console.log('clicked');
      startGame();
      document.querySelector('button').blur();
      document.querySelector('#start').setAttribute('disabled', true);
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
    stats.checkScore();
    document.querySelector('#start').setAttribute('disabled', false);
    console.log('received endgame event', e);
  });

  statsBoardContainer.addEventListener('nextLevel', (e) => {
    stats.checkScore();
    continueToNextLevel();
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
})();


export default gameController;
