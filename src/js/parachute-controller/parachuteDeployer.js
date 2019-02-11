const parachuteDeployer = (() => {
  function _appendToPayload({parent, child, cord}) {
    const paraCord = createCord({cord: {start, end}});
    parent.appendChild(paraCord);
  };

  function createCord({start, end, container}) {
    let paraCord = document.createElement('canvas');
    paraCord.classList.add('para-cord');
    paraCord.width = '5';
    paraCord.height = '30';
    // _appendToPayload(container);
    container.appendChild(paraCord);
    let context = paraCord.getContext('2d');
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    return paraCord;
  };

  function createCanopy({container}) {
    let canopy = document.createElement('canvas');
    canopy.classList.add('.canopy');
    canopy.width = '25';
    canopy.height = '10';
    // _appendToPayload();
    container.appendChild(canopy);
    const canopyContext = canopy.getContext('2d');
    canopyContext.beginPath();
    canopyContext.arc(13, 10, 10, 28.4, 25);
    canopyContext.stroke();
  }

  return {
    deployCord: createCord,
    deployCanopy: createCanopy,
  }
})();

export default parachuteDeployer;
