const parachuteDeployer = (() => {
  function appendToPayload({parent, child}) {

  };

  function createParachuteCord({start, end}) {
    let paraCord = document.createElement('canvas');
    paraCord.classList.add('para-cord');
    paraCord.width = '5';
    paraCord.height = '30';
    let context = paraCord.getContext('2d');
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    return paraCord;
  };

  function createParachute() {
    let parachute = document.createElement('canvas');
    parachute.classList.add('.parachute');
    let context = parachute.getContext('2d');
    context.beginPath();
    context.arc(10, 10, 10, 28.4, 25);
    context.stroke();
    return parachute;
  }
})();

export default parachuteDeployer;
