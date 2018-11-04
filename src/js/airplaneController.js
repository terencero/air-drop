import stats from './statsController';
import parachuteController from './parachuteController';
import world from './worldController';

const airplaneController = (() => {
  const airplane = document.querySelector('#airplane');
  let reset = false;
  
  function levelUpListener(airplanePath) {
    airplane.addEventListener('nextLevel', (e) => {
      stats.checkScore();
      stopTracker(airplanePath);
      world.removeIslands();
      console.log('received event', e);
    });
  }

  function _resetListener(airplanePath) {
    if (reset) {
      stopTracker(airplanePath);
      reset = false;
    }
  }

  function moveAirplane() {
    reset = false; // TODO: more ugly code... find a better way to do this instead of hacky flag
    const layout = document.querySelector('.layout');
    console.log(world.getWorld());
    parachuteController.createParachuteListener();

    const airplanePath = setInterval(() => {
      levelUpListener(airplanePath);
      _resetListener(airplanePath); // TODO: ugly
      
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
    reset = true;
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
