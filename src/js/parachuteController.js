import stats from './statsController.js';
import world from './worldController';
import {touchDetector} from './helpers';

const parachuteController = (() => {
  let parachuteRefs = {};
  function createParachute() {
    let parachute = document.createElement('div');
    parachute.className = 'parachute';
    parachute.style.width = `10px`;
    parachute.style.height = `10px`;
    parachute.style.backgroundColor = 'blue';
    parachute.style.position = 'absolute';
    parachute.style.right = airplane.style.right;
    parachute.style.top = `50px`;

    return parachute;
  };
  
  function parachuteTracker(parachute, interval) {
    let localTopPos = parseInt(parachute.style.top);
    let localRightPos = parseInt(parachute.style.right);
    let parachuteInterval;

    return parachuteInterval = setInterval(() => {
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
    clearInterval(parachuteInterval);
    parachuteInterval = null;
  };

  function resetParachutes() {
    const parachutes = document.querySelectorAll('.parachute');
    Object.keys(parachuteRefs).forEach(ref => {
      parachuteRefs[ref].parentNode.removeChild(parachuteRefs[ref]);
    });
  };
  
  function generateParachute() {
    const parachute = createParachute();
    document.querySelector('.air-lane').appendChild(parachute);
    console.log('parachutes obj', parachuteRefs);
    const par = parachuteTracker(parachute, 10);
    parachuteRefs = {...parachuteRefs, [par]: parachute};
    stats.updateStats({type: `decrementParachute`});
  }; 

  function pauseParachutes() {
    Object.keys(parachuteRefs).forEach(ref => {
      stopTracker(ref);
    })
  };

  function createParachuteListener() {
    document.body.onkeyup = (e) => {
      if (stats.level === 5) {
        // TODO: do something with stats and levelling up
      }
      if (stats.getStats().parachutes > 0) {
        if (e.keyCode === 32) {
          generateParachute();
        }
      } else {
        // TODO: use an observer pattern to control airplane or gameplay in general? or use simple event emit?
        stats.updateStats({type: `resetLevel`});
        console.log('no more parachutes');
      }
    }
  };

  return {
    createParachuteListener,
    resetParachutes,
    pauseParachutes,
    // resetParachutes: createParachute().resetParachutes,
    // pauseParachutes: createParachute().pauseParachutes,
  }
})();

export default parachuteController;
