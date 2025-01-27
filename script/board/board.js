/**
 * The input field is moved dynamically with a window width of 950px.
 */
function changeInputBoardLocation() {
  const inputContainer = document.querySelector('.boardInputContainer');
  const boardControls = document.querySelector('.boardControls');
  const boardContainer = document.querySelector('.boardContainer');
  const boardAddTask = document.getElementById('boardAddTask');

  windowThreshold(inputContainer, boardControls, boardContainer, boardAddTask);
  window.addEventListener('resize', changeInputBoardLocation);
}

/**
 * Adjusts the layout of elements based on whether the window width is below or above the threshold (950px).
 *
 * @param {HTMLElement} inputContainer - The input field container to reposition.
 * @param {HTMLElement} boardControls - The container holding the board controls.
 * @param {HTMLElement} boardContainer - The main container for the board section.
 * @param {HTMLElement} boardAddTask - The "Add Task +" button element.
 */
function windowThreshold(inputContainer, boardControls, boardContainer, boardAddTask) {
  if (window.innerWidth <= 950) {
    innerWidthBelowThreshold(inputContainer, boardControls, boardContainer, boardAddTask);
  } else {
    innerWidthAboveThreshold(inputContainer, boardControls, boardContainer, boardAddTask);
  }
}

/**
 * Handles layout adjustments for when the window width is under 950px.
 *
 * @param {HTMLElement} inputContainer - The input field container to reposition.
 * @param {HTMLElement} boardControls - The container holding the board controls.
 * @param {HTMLElement} boardContainer - The main container for the board section.
 * @param {HTMLElement} boardAddTask - The "Add Task +" button element.
 */
function innerWidthBelowThreshold(inputContainer, boardControls, boardContainer, boardAddTask) {
  if (boardControls.contains(inputContainer)) {
    boardContainer.insertAdjacentElement('afterend', inputContainer);
    boardAddTask.style.display = 'none';
  }
}

/**
 * Handles layout adjustments for when the window width is larger than 950px.
 *
 * @param {HTMLElement} inputContainer - The input field container to reposition.
 * @param {HTMLElement} boardControls - The container holding the board controls.
 * @param {HTMLElement} boardContainer - The main container for the board section.
 * @param {HTMLElement} boardAddTask - The "Add Task" button element.
 */
function innerWidthAboveThreshold(inputContainer, boardControls, boardContainer, boardAddTask) {
  if (!boardControls.contains(inputContainer)) {
    boardControls.appendChild(inputContainer);
    boardAddTask.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  changeInputBoardLocation()
});