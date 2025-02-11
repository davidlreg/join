/**
 * Dynamically adjusts the position of the input field based on the window width.
 * Adds an event listener to update the layout on window resize.
 *
 */
function changeInputBoardLocation() {
  const inputContainer = document.querySelector(".boardInputContainer");
  const boardControls = document.querySelector(".boardControls");
  const boardContainer = document.querySelector(".boardContainer");
  const boardAddTask = document.getElementById("boardAddTask");

  windowThreshold(inputContainer, boardControls, boardContainer, boardAddTask);
  window.addEventListener("resize", changeInputBoardLocation);
}

/**
 * Determines the appropriate layout adjustment based on the window width.
 *
 * @param {HTMLElement} inputContainer - The input field container.
 * @param {HTMLElement} boardControls - The board controls container.
 * @param {HTMLElement} boardContainer - The main board container.
 * @param {HTMLElement} boardAddTask - The "Add Task" button.
 */
function windowThreshold(inputContainer, boardControls, boardContainer, boardAddTask) {
  if (window.innerWidth <= 1400) {
    innerWidthBelowThreshold(inputContainer, boardControls, boardContainer, boardAddTask);
  } else {
    innerWidthAboveThreshold(inputContainer, boardControls, boardContainer, boardAddTask);
  }
}

/**
 * Moves the input field out of board controls and hides the "Add Task" button when the width is below 950px.
 *
 * @param {HTMLElement} inputContainer - The input field container.
 * @param {HTMLElement} boardControls - The board controls container.
 * @param {HTMLElement} boardContainer - The main board container.
 * @param {HTMLElement} boardAddTask - The "Add Task" button.
 */
function innerWidthBelowThreshold(inputContainer, boardControls, boardContainer, boardAddTask) {
  if (boardControls.contains(inputContainer)) {
    boardContainer.insertAdjacentElement("afterend", inputContainer);
    boardAddTask.style.display = "none";
  }
}

/**
 * Moves the input field back into board controls and shows the "Add Task" button when the width is above 950px.
 *
 * @param {HTMLElement} inputContainer - The input field container.
 * @param {HTMLElement} boardControls - The board controls container.
 * @param {HTMLElement} boardContainer - The main board container.
 * @param {HTMLElement} boardAddTask - The "Add Task" button.
 */
function innerWidthAboveThreshold(inputContainer, boardControls, boardContainer, boardAddTask) {
  if (!boardControls.contains(inputContainer)) {
    boardControls.appendChild(inputContainer);
    boardAddTask.style.display = "block";
  }
}

// Initialize input field positioning on page load.
document.addEventListener("DOMContentLoaded", () => {
  changeInputBoardLocation();
});
