import stats from './statsController.js';

const parachuteController = (() => {
  function createParachute() {
    let parachute = document.createElement('div');
    parachute.className = 'para1';
    parachute.style.width = `10px`;
    parachute.style.height = `10px`;
    parachute.style.backgroundColor = 'blue';
    parachute.style.position = 'absolute';
    parachute.style.right = airplane.style.right;
    parachute.style.top = `50px`;

    // let pos = 50;
    parachuteTracker({parachute}, 10);
    
    return parachute;
  };
  
  function parachuteTracker({parachute}, interval) {
    let localPos = parseInt(parachute.style.top);
    const parachuteInterval = setInterval(() => {
      const boundaries = parachute.getBoundingClientRect()
      if (touchDetector(boundaries).type === 'sea' && touchDetector(boundaries).value === true) {
        console.log('detect sea',stats.getStats());
        clearInterval();
        return stopTracker();
      } else if (touchDetector(boundaries).type === 'island' && touchDetector(boundaries).value === true) {
        stats.incrementPoints(1);
        console.log('detect island', stats.getStats());
        return stopTracker();
      }
      localPos+=1
      parachute.style.top = `${localPos}px`;
    }, interval)
    function stopTracker() {
      return clearInterval(parachuteInterval);
    };
  };
  
  document.body.onkeyup = (e) => {
    const endGame = new Event('endGame');
    if (stats.level === 5) {
      // stats
    }
    document.querySelector('#airplane').addEventListener('endGame', (e) => console.log('received', e));
    if (stats.getStats().parachutes > 0) {
      if (e.keyCode === 32) {
        document.querySelector('.air-lane').appendChild(createParachute());
        stats.decrementParachute();
        // console.log('minus parachute', stats.getStats());
      }
    } else {
      // need to reset or freeze game
      // TODO: use an observer pattern to control airplane or gameplay in general? or use simple event emit?
      document.querySelector('#airplane').dispatchEvent(endGame);
      console.log('no more parachutes');
    }
  }
  
  function touchDetector (/* [islands],  */parachute) {
    const sea = document.querySelector('.sea');
    const {islands} = stats.getStats();
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
    
    function landedOnIsland() {
      return  Object.keys(stats.getStats().islands).some(island => {
        return (parachute.bottom === islands[island].top) &&
        (parachute.right >= islands[island].left) &&
        (parachute.left <= islands[island].right);
      });
    }
  };
})();

export default parachuteController;