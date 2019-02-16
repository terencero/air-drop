import stats from '../stats-controllers/statsController.js';
import world from '../world-controller/worldController';
import parachuteController from './parachuteController';
import {createCord as deployCord, createCanopy as deployCanopy} from './parachuteDeployer';
import {touchDetector} from '../helpers';

const parachuteGenerator = (() => { 
  const worldHeight = document.querySelector('.layout').offsetHeight;

  let parachuteRefs = {};
  function createParachute() {
    // TODO: abstract this further away

    const payloadWrapper = document.createElement('div');
    payloadWrapper.classList.add('payload-wrapper');
    payloadWrapper.style.position = 'absolute';
    payloadWrapper.style.width = `25px`;
    payloadWrapper.style.top = `50px`;

    const canopyWrapper = document.createElement('div');
    canopyWrapper.classList.add('canopy-wrapper');
    payloadWrapper.appendChild(canopyWrapper);

    const parachuteCordContainer = document.createElement('div');  
    parachuteCordContainer.classList.add('parachute-cord-container');
    payloadWrapper.appendChild(parachuteCordContainer);

    const cordCanvasContainer = document.createElement('div');
    cordCanvasContainer.classList.add('cord-canvas-container');
    parachuteCordContainer.appendChild(cordCanvasContainer);

    
    const payloadContainer = document.createElement('div');
    payloadContainer.classList.add('payload-container');
    parachuteCordContainer.appendChild(payloadContainer);
    

    const supplies = document.createElement('div');
    payloadContainer.appendChild(supplies);
    supplies.className = 'supplies';
    supplies.style.width = `10px`;
    supplies.style.height = `10px`;
    supplies.style.backgroundColor = 'blue';

    const containers = { //TODO: need to expose this to any function that consumes create parachute...
      payloadWrapper,
      canopyWrapper,
      parachuteCordContainer,
      cordCanvasContainer,
      payloadContainer,
    };

    return {
      payload: {
        ...containers,
      },
      parachuteTracker,
      stopTracker,
    }
  };

  
  function parachuteTracker({parachute: {payloadWrapper, cordCanvasContainer, canopyWrapper}}, interval) {
    const airplane = document.querySelector('#airplane');
    let localRightPos = parseInt(airplane.style.right);
    let localTopPos = parseInt(payloadWrapper.style.top);
    let parachuteInterval;
    let attached = false;
    // TODO: set parachuteInterval to null?
    return parachuteInterval = setInterval(() => {
      const boundaries = payloadWrapper.getBoundingClientRect()

      if (
        touchDetector(boundaries).type === 'sea' && 
        touchDetector(boundaries).value === true
        ) {
        console.log('detect sea',stats.getStats());
        parachuteController.notifyLanding({type: `sea`, intervalId: parachuteInterval});
        stopTracker(parachuteInterval);
        return false;
      } else if (
        touchDetector(boundaries).type === 'island' && 
        touchDetector(boundaries).value === true
        ) {
        console.log('detect island', stats.getStats());
        parachuteController.notifyLanding({type: `island`, intervalId: parachuteInterval});
        stopTracker(parachuteInterval);
        return false;
      }
      if (localTopPos > worldHeight/2) {
        localTopPos+=.5
        if (!attached) {
          attached = true
          deployCord({
            start: {
              x: 0,
              y: 0,
            },
            end: {
              x: 5,
              y: 30,
            },
            container: cordCanvasContainer,
          });
          deployCord({
            start: {
              x: 5,
              y: 0,
            },
            end: {
              x: 0,
              y: 30,
            },
            container: cordCanvasContainer,
          });
          deployCanopy({container: canopyWrapper});
        }
      } else {
        localTopPos+=1.5
      }
      payloadWrapper.style.top = `${localTopPos}px`;
      localRightPos+=world.getWind();
      payloadWrapper.style.right = `${localRightPos}px`;
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
