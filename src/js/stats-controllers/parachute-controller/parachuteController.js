import stats from '../statsController';
import parachuteGenerator from './parachuteGenerator';

function requestParachutes() {
  let requestValue;
  if (stats.getStats().level === 1) {
    requestValue = 5
  } else {
    requestValue = 3
  }
  stats.getStats().parachutes = parachuteGenerator.generateParachutes({requestValue});
}


function deployParachute() {
  const {key, parachute, actions} = _findDeployableParachute();
  if (key) {
    stats.getStats().parachutes[key].intervalId = actions.parachuteTracker({parachute: parachute}, 10);
    document.querySelector('.air-lane').appendChild(parachute);
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
    if (parachuteRefs[ref].intervalId != null){
      tempParachute = parachuteRefs[ref].parachuteCtrl.parachute;
      tempParachute.parentNode.removeChild(tempParachute);
    }
  });
};

function notifyLanding({type, intervalId}) {
  const key = Object.keys(stats.getStats().parachutes).find(ref => stats.getStats().parachutes[ref].intervalId === intervalId);
  stats.getStats().parachutes[key].intervalId = `expired`;
  if (_remainingIntervalIds().length === 5) {
    stats.resetLevel();
    pauseParachutes();
  }
  if (type === 'island') {
    // TODO: increment points, remove point logic from the parachute controller
    stats.updateStats({type: `incrementPoints`, payload: 1});
  }
};

function _remainingIntervalIds() {
  const keys = Object.keys(stats.getStats().parachutes);
  return keys.filter(parachute => stats.getStats().parachutes[parachute].intervalId === `expired`);
};

function _findDeployableParachute() {
  const keys = Object.keys(stats.getStats().parachutes);
  const availableParachuteKey = keys.find(parachute => stats.getStats().parachutes[parachute].intervalId === `ready`);
  if (availableParachuteKey === undefined) {
    // stats.resetLevel();
    // pauseParachutes();
    return;
  }
  const availableParachute = stats.getStats().parachutes[availableParachuteKey];
  return {
    key: availableParachuteKey,
    parachute: availableParachute.parachuteCtrl.parachute,
    actions: {
      parachuteTracker: availableParachute.parachuteCtrl.parachuteTracker,
    }
  }
}

export default {
  requestParachutes,
  deployParachute,
  pauseParachutes,
  notifyLanding,
  resetParachutes,
}
