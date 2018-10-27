import stats from './js/statsController.js';
import parachuteController from './js/parachuteController.js';

const airplane = document.querySelector('#airplane');
console.log('loaded');

const airplaneController = (() => {
  airplane.addEventListener('endGame', (e) => {
    stats.checkScore();
    console.log('received event', e);
  });
  const randomLandingPadGenerator = (val) => {
    const island = document.createElement('div');
    const refNode = document.querySelector(`.island-container.${val}`);
    const gridPositions = {
      1: 'start',
      2: 'center',
      3: 'end',
    };
    island.className = 'island-small';
    island.style.width = `50px`;
    island.style.height = `20px`;
    island.style.backgroundColor = 'green';
    island.style.alignSelf = `end`;
    island.style.justifySelf = `${gridPositions[Math.floor(Math.random() * 3) + 1]}`;
    island.style.bottom = `0`;
    refNode.appendChild(island);
    return island;
  };

  const moveAirplane = () => {
    const layout = document.querySelector('.layout');
    stats.addIsland([
      {
        name: 'island1',
        value: randomLandingPadGenerator('a').getBoundingClientRect(),
      },
      {
        name: 'island2',
        value: randomLandingPadGenerator('b').getBoundingClientRect(),
      },
      {
        name: 'island3',
        value: randomLandingPadGenerator('c').getBoundingClientRect(),
      },
    ]);
    parachuteController();
    const airPlanePath = setInterval(() => {
      if (stats.getStats().pos > layout.offsetWidth) {
        stopTracker();
      } else {
        stats.incrementPosition(1);
        console.log('increment')
        airplane.style.right = `${stats.getStats().pos}px`;
      }
    }, 50);

    function stopTracker() {
      clearInterval(airPlanePath);
    }
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
