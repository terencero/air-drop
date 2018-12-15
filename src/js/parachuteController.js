import stats from './statsController.js';
import world from './worldController';
import {touchDetector} from './helpers';

const parachuteController = (() => {
  let reset = false;
  let parachuteInterval;
  function createParachute() {
    let parachute = document.createElement('div');
    parachute.className = 'parachute';
    parachute.style.width = `10px`;
    parachute.style.height = `10px`;
    parachute.style.backgroundColor = 'blue';
    parachute.style.position = 'absolute';
    parachute.style.right = airplane.style.right;
    parachute.style.top = `50px`;
    parachuteTracker(parachute, 10);
    
    return parachute;
  };
  
  function parachuteTracker(parachute, interval) {
    let localTopPos = parseInt(parachute.style.top);
    let localRightPos = parseInt(parachute.style.right);

    parachuteInterval = setInterval(() => {
      const boundaries = parachute.getBoundingClientRect()
      // if (reset) { 
      //   return stopTracker(parachuteInterval);
      // }
      if (touchDetector(boundaries).type === 'sea' && touchDetector(boundaries).value === true) {
        console.log('detect sea',stats.getStats());
        return stopTracker(parachuteInterval);
      } else if (touchDetector(boundaries).type === 'island' && touchDetector(boundaries).value === true) {
        stats.updateStats({type: `incrementPoints`, payload: 1});
        console.log('detect island', stats.getStats());
        return stopTracker(parachuteInterval);
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
    // reset = true;
    const parachutes = document.querySelectorAll('.parachute');
    stopTracker(parachuteInterval);
    parachutes.forEach(parachute => parachute.parentNode.removeChild(parachute));
    // reset = false;
  }
  
  function createParachuteListener() {
    document.body.onkeyup = (e) => {
      // const endGame = new Event('endGame');
      if (stats.level === 5) {
        // stats
      }
      if (stats.getStats().parachutes > 0) {
        if (e.keyCode === 32) {
          document.querySelector('.air-lane').appendChild(createParachute());
          stats.updateStats({type: `decrementParachute`});
        }
      } else {
        // need to reset or freeze game
        // TODO: use an observer pattern to control airplane or gameplay in general? or use simple event emit?
        // document.querySelector('#airplane').dispatchEvent(endGame);
        console.log('no more parachutes');
      }
    }
  }

  return {
    createParachuteListener,
    resetParachutes,
  }
})();

export default parachuteController;
