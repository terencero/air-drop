import stats from './statsController';

const statsBoardController = (() => {
  function _displayPoints() {
    document.querySelector('.points-container').innerHTML = `Points: ${stats.getStats().points}`;
  };
  
  function _displayLevel() {
    document.querySelector('.level-container').innerHTML = `Level: ${stats.getStats().level}`;
  };
  
  function _displayParachutes() {
    const parachutes = stats.getStats().parachutes;
    const parachutesLength = Object.keys(parachutes).filter(p => parachutes[p].intervalId === `ready`).length;
    document.querySelector('.parachutes-container').innerHTML = `Parachutes left: ${parachutesLength}`;
  }

  function _displayUserName() {
    
  };

  function displayGameMessage({message}) {
    const successMessage = `Congrats! You've made it to the next level!`;
    const failureMessage = `Too bad... Maybe next time. Restart the game? Don't be a quitter!`
    const wind = `Looks like there's some mild wind.`
    let modal = document.createElement(`div`);
    modal.setAttribute(`class`, `message-modal`);
    
    if (message === `success`) {
      message = document.createTextNode(successMessage);
    } else if (message === `failure`) {
      message = document.createTextNode(failureMessage);
    } else if (message === `wind`) {
      message = document.createTextNode(wind);
      // return;
    }
    modal.appendChild(message);
    document.querySelector('.message-board').appendChild(modal);
  }

  function updateBoard() {
    _displayLevel();
    _displayPoints();
    _displayParachutes();
  };

  return {
    displayGameMessage,
    updateBoard,
  }
})();

export default statsBoardController;
