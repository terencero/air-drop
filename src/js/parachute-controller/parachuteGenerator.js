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
    
    
    function attachCords() {
      const cordLeft = document.createElement('canvas');
      cordLeft.classList.add('left');
      cordLeft.height = '30';
      cordLeft.width = '5';
      cordCanvasContainer.appendChild(cordLeft);
      const contextLeft = cordLeft.getContext('2d');
      contextLeft.beginPath();
      contextLeft.moveTo(0, 0);
      contextLeft.lineTo(5, 30);
      contextLeft.stroke();
      
      const cordRight = document.createElement('canvas');
      cordRight.classList.add('left');
      cordRight.height = '30';
      cordRight.width = '5';
      cordCanvasContainer.appendChild(cordRight);
      const contextRight = cordRight.getContext('2d');
      contextRight.beginPath();
      contextRight.moveTo(5, 0);
      contextRight.lineTo(0, 30);
      contextRight.stroke();

      const canopy = document.createElement('canvas');
      canopy.width = '25';
      canopy.height = '10';
      canopyWrapper.appendChild(canopy);
      const canopyContext = canopy.getContext('2d');
      canopyContext.beginPath();
      canopyContext.arc(13, 10, 10, 28.4, 25);
      canopyContext.stroke();
    };

    return {
      payload: {
        ...containers,
        attachCords
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
      if (localTopPos > worldHeight/2) {
        // parachuteDeployer.deployParachute(/* pass in refs */)
        localTopPos+=.5
        if (!attached) {
          attached = true
          // attachCords();
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
