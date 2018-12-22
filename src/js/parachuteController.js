import stats from './statsController.js';
import world from './worldController';
import {touchDetector} from './helpers';

const parachuteController = (() => {
  function createParachute() {
    let parachuteInterval;
    let parachute = document.createElement('div');
    parachute.className = 'parachute';
    parachute.style.width = `10px`;
    parachute.style.height = `10px`;
    parachute.style.backgroundColor = 'blue';
    parachute.style.position = 'absolute';
    parachute.style.right = airplane.style.right;
    parachute.style.top = `50px`;
    parachuteTracker(parachute, 10);
  
    function parachuteTracker(parachute, interval) {
      let localTopPos = parseInt(parachute.style.top);
      let localRightPos = parseInt(parachute.style.right);

      parachuteInterval = setInterval(() => {
        const boundaries = parachute.getBoundingClientRect()

        if (touchDetector(boundaries).type === 'sea' && touchDetector(boundaries).value === true) {
          console.log('detect sea',stats.getStats());
          stopTracker(parachuteInterval);
          return false;
        } else if (touchDetector(boundaries).type === 'island' && touchDetector(boundaries).value === true) {
          stats.updateStats({type: `incrementPoints`, payload: 1});
          console.log('detect island', stats.getStats());
          stopTracker(parachuteInterval);
          return false;
        }
        localTopPos+=1
        parachute.style.top = `${localTopPos}px`;
        localRightPos+=world.getWind();
        parachute.style.right = `${localRightPos}px`;
      }, interval);

    };

    function stopTracker(parachuteInterval) {
      return clearInterval(parachuteInterval);
    };

    function resetParachutes() {
      const parachutes = document.querySelectorAll('.parachute');
      stopTracker(parachuteInterval);
      parachutes.forEach(parachute => parachute.parentNode.removeChild(parachute));
    };
    
    function generateCreatedParachute() {
      document.querySelector('.air-lane').appendChild(parachute);
    }
    return {
      generateCreatedParachute,
      resetParachutes,
    };
  };

  function createParachuteListener() {
    document.body.onkeyup = (e) => {
      if (stats.level === 5) {
        // TODO: do something with stats and levelling up
      }
      if (stats.getStats().parachutes > 0) {
        if (e.keyCode === 32) {
          createParachute().generateCreatedParachute();
          stats.updateStats({type: `decrementParachute`});
        }
      } else {
        const endGame = new Event('endGame');
        // need to reset or freeze game
        // TODO: use an observer pattern to control airplane or gameplay in general? or use simple event emit?
        document.querySelector('#stats-board').dispatchEvent(endGame);
        console.log('no more parachutes');
      }
    }
  };

  return {
    createParachuteListener,
    resetParachutes: createParachute().resetParachutes,
  }
})();

export default parachuteController;
