import stats from '../statsController.js';
import world from '../world-controller/worldController';
import parachuteController from './parachuteController';
import {touchDetector} from '../../helpers';

const parachuteGenerator = (() => { 
  let parachuteRefs = {};
  function createParachute() {
    let parachute = document.createElement('div');
    parachute.className = 'parachute';
    parachute.style.width = `10px`;
    parachute.style.height = `10px`;
    parachute.style.backgroundColor = 'blue';
    parachute.style.position = 'absolute';
    parachute.style.top = `50px`;
    
    return {
      parachute,
      parachuteTracker,
      stopTracker,
    }
  };
  
  function parachuteTracker({parachute}, interval) {
    const airplane = document.querySelector('#airplane');
    let localRightPos = parseInt(airplane.style.right);
    let localTopPos = parseInt(parachute.style.top);
    let parachuteInterval;
    // TODO: set parachuteInterval to null?
    return parachuteInterval = setInterval(() => {
      const boundaries = parachute.getBoundingClientRect()

      if (touchDetector(boundaries).type === 'sea' && touchDetector(boundaries).value === true) {
        console.log('detect sea',stats.getStats());
        parachuteController.notifyLanding({type: `sea`, intervalId: parachuteInterval});
        stopTracker(parachuteInterval);
        return false;
      } else if (touchDetector(boundaries).type === 'island' && touchDetector(boundaries).value === true) {
        console.log('detect island', stats.getStats());
        parachuteController.notifyLanding({type: `island`, intervalId: parachuteInterval});
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
  };
  
  function generateParachutes({requestValue}) {
    console.log('parachutes obj', parachuteRefs);
    let parachuteObj = {};
    for (let i = 0; i < requestValue; i++) {
      parachuteObj[i] = {
        parachuteCtrl: createParachute(), 
        intervalId: `ready`,
      };
    }
    return parachuteObj;
  }; 

  return {
    generateParachutes,
  }
})();

export default parachuteGenerator;
