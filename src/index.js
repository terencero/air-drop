import stats from './js/statsController';
import parachuteController from './js/parachuteController';
import world from './js/worldController';

const airplane = document.querySelector('#airplane');
console.log('loaded');

const airplaneController = (() => {
  airplane.addEventListener('endGame', (e) => {
    stats.checkScore();
    world.removeIslands();
    console.log('received event', e);
  });
  
  function levelUpListener(stopTracker) {
    airplane.addEventListener('nextLevel', (e) => {
      stats.checkScore();
      stopTracker();
      world.removeIslands();
      console.log('received event', e);
    });
  }

  const moveAirplane = () => {
    const layout = document.querySelector('.layout');
    world.addIsland([
      {
        name: 'island1',
        value: world.randomIslandGenerator('a').getBoundingClientRect(),
      },
      {
        name: 'island2',
        value: world.randomIslandGenerator('b').getBoundingClientRect(),
      },
      {
        name: 'island3',
        value: world.randomIslandGenerator('c').getBoundingClientRect(),
      },
    ]);
    parachuteController();
    const airPlanePath = setInterval(() => {
      if (stats.getStats().pos > layout.offsetWidth) {
        stopTracker();
        const endGame = new Event('endGame');
        document.querySelector('#airplane').dispatchEvent(endGame);
      } else {
        stats.incrementPosition(1);
        console.log('increment')
        airplane.style.right = `${stats.getStats().pos}px`;
      }
    }, 50);

    function stopTracker() {
      clearInterval(airPlanePath);
    }

    levelUpListener(stopTracker);
  }
  
  const flyListener = (() => {
    document.querySelector('button').addEventListener('click', () => {
      console.log('clicked');
      moveAirplane();
      document.querySelector('button').blur();
      stats.initStatsBoard();
    });
  })();
  
  return {
    moveAirplane: moveAirplane,
  }
})();


export default airplaneController;
