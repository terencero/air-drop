import stats from '../statsController.js';
import world from '../../worldController';
import parachuteController from './parachuteController';
import {touchDetector} from '../../helpers';

const parachuteGenerator = (() => { 
  // TODO: change this to a parachute generator, move the controller logic into controls object modules
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
    // return parachute;
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
        // stats.updateStats({type: `notifyLanding`, payload: {type: `sea`, intervalId: parachuteInterval}})
        parachuteController.notifyLanding({type: `sea`, intervalId: parachuteInterval});
        stopTracker(parachuteInterval);
        return false;
      } else if (touchDetector(boundaries).type === 'island' && touchDetector(boundaries).value === true) {
        console.log('detect island', stats.getStats());
        // stats.updateStats({type: `notifyLanding`, payload: {type: `island`, intervalId: parachuteInterval}})
        parachuteController.notifyLanding({type: `island`, intervalId: parachuteInterval});
        stopTracker(parachuteInterval);
        return false;
      }
      localTopPos+=1
      parachute.style.top = `${localTopPos}px`;
      localRightPos+=world.getWind();
      parachute.style.right = `${localRightPos}px`;
      console.log('stuff and nonsense');
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

  function createParachuteListener() {
    document.body.onkeyup = (e) => {
        if (e.keyCode === 32) {
          parachuteController.deployParachute();
        }
      
        // TODO: use an observer pattern to control airplane or gameplay in general? or use simple event emit?
        // stats.updateStats({type: `resetLevel`});
        // console.log('no more parachutes');
      }
  };

  return {
    createParachuteListener,
    generateParachutes,
    // pauseParachutes,
  }
})();

export default parachuteGenerator;
