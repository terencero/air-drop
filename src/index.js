import world from './js/worldController';
import stats from './js/statsController'
import airplane from './js/airplaneController';
import parachutes from './js/parachuteController';

console.log('loaded');

const gameController = (() => {
  const flyListener = (() => {
    document.querySelector('#start').addEventListener('click', () => {
      console.log('clicked');
      startGame();
      document.querySelector('button').blur();
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
  };

  function continueToNextLevel() {

  };
})();


export default gameController;
