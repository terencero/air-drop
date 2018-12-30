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

function _findDeployableParachute() {
  const keys = Object.keys(stats.getStats().parachutes);
  const availableParachuteKey = keys.find(parachute => stats.getStats().parachutes[parachute].intervalId === null);
  if (availableParachuteKey === undefined) {
    stats.resetLevel();
    pauseParachutes();
    return false;
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

function notifyLanding({type, intervalId}) {
  if (type === 'island') {
    // TODO: increment points, remove point logic from the parachute controller
  } else if (type === 'sea') {
    // stuff
  }
  const key = Object.keys(stats.getStats().parachutes).find(ref => stats.getStats().parachutes[ref].intervalId === intervalId);
  stats.getStats().parachutes[key].intervalId = `expired`;
}

export default {
  requestParachutes,
  deployParachute,
  pauseParachutes,
  notifyLanding,
}
