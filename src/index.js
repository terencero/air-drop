import airplane from './js/airplaneController';
import world from './js/worldController';
import stats from './js/statsController'

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
    }).then(() => airplane.moveAirplane());
  };

  function resetGame() {

  };

  function continueToNextLevel() {

  };
  
  return {
    startGame,
  }
})();


export default gameController;
