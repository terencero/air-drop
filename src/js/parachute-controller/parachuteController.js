import stats from '../stats-controllers/statsController';
import parachuteGenerator from './parachuteGenerator';

function requestParachutes() {
  let requestValue;
  // if (stats.getStats().level === 1) {
    requestValue = 5
  // } else {
    // requestValue = 3
  // }
  stats.getStats().parachutes = parachuteGenerator.generateParachutes({requestValue});
}

function createParachuteListener() {
  document.body.onkeyup = (e) => {
      if (e.keyCode === 32) {
        deployParachute();
      }
    }
};

function deployParachute() {
  const {key = false, parachute, actions} = _findDeployableParachute();
  if (key) {
    stats.getStats().parachutes[key].intervalId = actions.parachuteTracker(parachute, 10);
    document.querySelector('.air-lane').appendChild(parachute.parachute.payloadWrapper);
  }
};

function pauseParachutes() {
  Object.keys(stats.getStats().parachutes).forEach(ref => {
    stats.getStats().parachutes[ref].parachuteCtrl.stopTracker(stats.getStats().parachutes[ref].intervalId);
  });
};

function resetParachutes() {
  const parachuteRefs = stats.getStats().parachutes;
  let tempParachute;
  Object.keys(parachuteRefs).forEach(ref => {
    if (parachuteRefs[ref].intervalId !== `ready`){
      tempParachute = parachuteRefs[ref].payload.payloadWrapper;
      tempParachute.parentNode.removeChild(tempParachute);
    }
  });
};

function notifyLanding({type, intervalId}) {
  const parachutes = stats.getStats().parachutes;
  const key = Object.keys(parachutes).find(ref => parachutes[ref].intervalId === intervalId);
  parachutes[key].intervalId = `expired`;
  
  if (type === 'island') {
    // TODO: increment points, remove point logic from the parachute controller
    stats.updateStats({type: `incrementPoints`, payload: 1});
  }
};

function _filterExpiredIntervalIds() {
  const keys = Object.keys(stats.getStats().parachutes);
  return keys.filter(parachute => stats.getStats().parachutes[parachute].intervalId === `expired`);
};

function _findDeployableParachute() {
  const keys = Object.keys(stats.getStats().parachutes);
  const availableParachuteKey = keys.find(parachute => stats.getStats().parachutes[parachute].intervalId === `ready`);
  if (availableParachuteKey === undefined) {
    return {};
  }
  const availableParachute = stats.getStats().parachutes[availableParachuteKey];
  return {
    key: availableParachuteKey,
    parachute: {
      parachute: availableParachute.payload,
    },
    actions: {
      parachuteTracker: availableParachute.parachuteTracker,
    }
  }
};

export default {
  requestParachutes,
  deployParachute,
  pauseParachutes,
  notifyLanding,
  resetParachutes,
  createParachuteListener,
}
