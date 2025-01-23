function changeInputBoardLocation() {
  const inputContainer = document.querySelector('.boardInputContainer');
  const boardControls = document.querySelector('.boardControls');
  const boardContainer = document.querySelector('.boardContainer');
  
  setWindowWidth(inputContainer,  boardControls, boardContainer)
  window.addEventListener('resize', changeInputBoardLocation);
}

function setWindowWidth(inputContainer,  boardControls, boardContainer) {
  if (window.innerWidth <= 950) {
    if (boardControls.contains(inputContainer)) {
      boardContainer.insertAdjacentElement('afterend', inputContainer);
    }
  } else {
    if (!boardControls.contains(inputContainer)) {
      boardControls.appendChild(inputContainer); 
    }
  }
}
  