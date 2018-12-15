import stats from './statsController';
import parachuteController from './parachuteController';
import world from './worldController';

const airplaneController = (() => {
  const airplane = document.querySelector('#airplane');
  let airplanePath;

  function moveAirplane() {
    const layout = document.querySelector('.layout');
    console.log(world.getWorld());
    parachuteController.createParachuteListener();

    airplanePath = setInterval(() => {
      if (stats.getStats().pos > layout.offsetWidth) {
        stopTracker(airplanePath);
        const endGame = new Event('endGame');
        document.querySelector('#stats-board').dispatchEvent(endGame);
      } else {
        stats.incrementPosition(1);
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
    reset = true;
  };
  
  return {
    moveAirplane,
    resetAirplane,
    pauseAirplane,
  }
})();

export default airplaneController;
