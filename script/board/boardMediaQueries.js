/**
 * Adjusts input field position based on window width.
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
 * Adjusts layout based on window width.
 *
 * @param {HTMLElement} inputContainer
 * @param {HTMLElement} boardControls
 * @param {HTMLElement} boardContainer
 * @param {HTMLElement} boardAddTask
 */
function windowThreshold(
  inputContainer,
  boardControls,
  boardContainer,
  boardAddTask
) {
  if (window.innerWidth <= 1000) {
    innerWidthBelowThreshold(
      inputContainer,
      boardControls,
      boardContainer,
      boardAddTask
    );
  } else {
    innerWidthAboveThreshold(
      inputContainer,
      boardControls,
      boardContainer,
      boardAddTask
    );
  }
}

/**
 * Moves input field out of board controls and hides "Add Task" button if width < 950px.
 *
 * @param {HTMLElement} inputContainer
 * @param {HTMLElement} boardControls
 * @param {HTMLElement} boardContainer
 * @param {HTMLElement} boardAddTask
 */
function innerWidthBelowThreshold(
  inputContainer,
  boardControls,
  boardContainer,
  boardAddTask
) {
  if (boardControls.contains(inputContainer)) {
    boardContainer.insertAdjacentElement("afterend", inputContainer);
    boardAddTask.style.display = "none";
  }
}

/**
 * Moves input field into board controls and shows "Add Task" button if width > 950px.
 *
 * @param {HTMLElement} inputContainer
 * @param {HTMLElement} boardControls
 * @param {HTMLElement} boardContainer
 * @param {HTMLElement} boardAddTask
 */
function innerWidthAboveThreshold(
  inputContainer,
  boardControls,
  boardContainer,
  boardAddTask
) {
  if (!boardControls.contains(inputContainer)) {
    boardControls.appendChild(inputContainer);
    boardAddTask.style.display = "block";
  }
}
