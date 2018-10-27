import stats from './statsController.js';

function touchDetector (parachute) {
  const sea = document.querySelector('.sea');
  const {islands} = stats.getStats();
  function landedOnIsland() {
    return  Object.keys(stats.getStats().islands).some(island => {
      return (parachute.bottom === islands[island].top) &&
      (parachute.right >= islands[island].left) &&
      (parachute.left <= islands[island].right);
    });
  }
  if (parachute.bottom === sea.getBoundingClientRect().top) {
    return {
      type: 'sea',
      value: true,
    };
  }
  return {
    type: 'island',
    value: landedOnIsland(),
  }  
};

export {
  touchDetector,
};
