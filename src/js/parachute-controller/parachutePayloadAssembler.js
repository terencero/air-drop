function _appendToPayload({parent, child, cord}) {
  const paraCord = createCord({cord: {start, end}});
  parent.appendChild(paraCord);
};

function structurePayload() {
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

    return {
      payloadWrapper,
      canopyWrapper,
      parachuteCordContainer,
      cordCanvasContainer,
      payloadContainer,
    };
}

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
  canopy.classList.add('canopy');
  canopy.width = '25';
  canopy.height = '10';
  // _appendToPayload();
  container.appendChild(canopy);
  const canopyContext = canopy.getContext('2d');
  canopyContext.beginPath();
  canopyContext.arc(13, 10, 10, 28.4, 25);
  canopyContext.stroke();
};

export {
  createCord,
  createCanopy,
  structurePayload,
};
