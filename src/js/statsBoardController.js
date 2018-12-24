import stats from './statsController';

const statsBoardController = (() => {
  function _displayPoints() {
    document.querySelector('.points-container').innerHTML = `Points: ${stats.getStats().points}`;
  };
  
  function _displayLevel() {
    document.querySelector('.level-container').innerHTML = `Level: ${stats.getStats().level}`;
  };
  
  function _displayParachutes() {
    document.querySelector('.parachutes-container').innerHTML = `Parachutes left: ${stats.getStats().parachutes}`;
  }

  function _displayUserName() {
    
  };

  function displayGameMessage() {
    const successMessage = `Congrats! You've made it to the next level!`;
    const failureMessage = `Too bad... Maybe next time. Restart the game? Don't be a quitter!`
    let message = ``;
    let modal = document.createElement(`div`);
    modal.setAttribute(`class`, `message-modal`);
    modal.style.position = `fixed`;
    if (stats.getStats().levelIncreaseFlag) {
      message = document.createTextNode(successMessage);
    } else {
      message = document.createTextNode(failureMessage);
    }
    modal.appendChild(message);
    document.querySelector('.layout').appendChild(modal);
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
