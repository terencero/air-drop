const parachuteDeployer = (() => {
  function appendToPayload({parent, child, cord}) {
    const paraCord = createCord({cord: {start, end}});
    parent.appendChild(paraCord);
  };

  function createCord({start, end}) {
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

  function createCanopy() {
    let parachute = document.createElement('canvas');
    parachute.classList.add('.parachute');
    let context = parachute.getContext('2d');
    context.beginPath();
    context.arc(10, 10, 10, 28.4, 25);
    context.stroke();
    return parachute;
  }

  return {
    deployParachute: appendToPayload,
  }
})();

export default parachuteDeployer;
