import stats from './stats-controllers/statsController';
import parachuteController from './stats-controllers/parachute-controller/parachuteGenerator';
import world from './worldController';

const airplaneController = (() => {
  const airplane = document.querySelector('#airplane');
  const layout = document.querySelector('.layout');
  let airplanePath;

  function moveAirplane() {
    console.log(world.getWorld());
    parachuteController.createParachuteListener();

    airplanePath = setInterval(() => {
      if (stats.getStats().pos > layout.offsetWidth) {
        stopTracker(airplanePath);
        const endGame = new Event('endGame');
        document.querySelector('#stats-board').dispatchEvent(endGame);
      } else {
        // stats.incrementPosition(1);
        stats.updateStats({type: `incrementPosition`, payload: 1})
        console.log('increment')
        airplane.style.right = `${stats.getStats().pos}px`;
      }
    }, 20);
  }
  
  function stopTracker(airplanePath) {
    clearInterval(airplanePath);
  }

  function resetAirplane() {    
    stopTracker(airplanePath);
    airplane.style.right = 0;
  }

  function pauseAirplane() {
    stopTracker(airplanePath);
  };
  
  return {
    moveAirplane,
    resetAirplane,
    pauseAirplane,
  }
})();

export default airplaneController;
