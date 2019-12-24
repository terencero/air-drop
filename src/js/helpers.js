import world from './world-controller/worldController';

function touchDetector (parachute) {
  // test
  const sea = document.querySelector('.sea');
  const {islands} = world.getWorld();
  
  function landedOnIsland() {
    return Object.keys(islands).some(island => {
      return (parachute.bottom === islands[island].top) &&
      ((parachute.right >= islands[island].left) && (parachute.left <= islands[island].right));
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
