import stats from './statsController';
import parachuteController from './parachuteController';
import world from './worldController';

const airplaneController = (() => {
  const airplane = document.querySelector('#airplane');
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
    console.log(world.getWorld());
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
  
  return {
    moveAirplane: moveAirplane,
  }
})();

export default airplaneController;
