import stats from './stats-controllers/statsController';
import parachuteController from './parachute-controller/parachuteController';
import world from './world-controller/worldController';

const airplaneController = (() => {
  const airplane = document.querySelector('#airplane');
  const layout = document.querySelector('.layout');
  let airplanePath;

  const airplanePosition = {
    pos: 0,
  };

  function moveAirplane() {
    console.log(world.getWorld());
    parachuteController.createParachuteListener();

    airplanePath = setInterval(() => {
      if (airplanePosition.pos > layout.offsetWidth) {
        stopTracker(airplanePath);
        const endGame = new Event('endGame');
        document.querySelector('#stats-board').dispatchEvent(endGame);
      } else {
        stats.updateStats({type: `incrementPosition`, payload: 1})
        // stats.updateStats().incrementPosition(1);
        airplanePosition.pos+=1
        console.log('increment')
        airplane.style.right = `${airplanePosition.pos}px`;
      }
    }, 20);
  }
  
  function stopTracker(airplanePath) {
    clearInterval(airplanePath);
  }

  function resetAirplane() {    
    stopTracker(airplanePath);
    airplanePosition.pos = 0
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
