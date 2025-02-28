/**
 * Stores the selected board section for task placement.
 *
 * @type {string | null}
 */
let selectedBoardSection = null;

/**
 * Opens the task overlay or redirects to the add task page on smaller screens.
 *
 * @param {string} boardSection - The board section where the new task will be added.
 */
function addTaskOverlay(boardSection) {
  if (isSmallScreen()) {
    redirectToAddTaskPage(boardSection);
  } else {
    showOverlay(boardSection);
  }
}

/**
 * Checks if the screen width is smaller than or equal to 1000px.
 *
 * @returns {boolean} - True if the screen width is small, false otherwise.
 */
function isSmallScreen() {
  return window.innerWidth <= 1000;
}

/**
 * Redirects to the add task page with the given board section.
 *
 * @param {string} boardSection - The board section where the new task will be added.
 */
function redirectToAddTaskPage(boardSection) {
  window.location.href = `http://127.0.0.1:5500/html/addTask.html?active=addTask&boardSection=${encodeURIComponent(
    boardSection
  )}`;
}

/**
 * Displays the task overlay and populates it with the corresponding HTML template.
 *
 * @param {string} boardSection - The board section where the new task will be added.
 */
function showOverlay(boardSection) {
  let overlay = document.getElementById("addTaskOverlay");
  let dynamicContent = document.getElementById("overlayDynamicContent");

  dynamicContent.innerHTML = addTaskHtmlTemplate();
  overlay.classList.remove("hidden");
  selectedBoardSection = boardSection;

  animateOverlay();
}

/**
 * Adds an animation to the overlay task content.
 *
 */
function animateOverlay() {
  setTimeout(() => {
    document.querySelector(".overlayTaskContent").classList.add("animate");
  }, 50);
}

/**
 * Closes the task overlay with an animation effect or redirects to the board page.
 *
 */
function closeTaskOverlay() {
  const overlay = document.getElementById("addTaskOverlay");
  const content = document.querySelector(".overlayTaskContent");

  if (overlay && content) {
    hideOverlay(content);
  }
}

/**
 * Hides the task overlay with a slide-out animation and redirects to the board page.
 *
 * @param {HTMLElement} content - The content element of the overlay.
 */
function hideOverlay(content) {
  content.classList.remove("animate");
  content.style.animation = "slideOut 0.3s ease-in forwards";

  setTimeout(() => {
    const overlay = document.getElementById("addTaskOverlay");
    overlay.classList.add("hidden");
    content.style.animation = "";
    window.location.href = "/html/board.html?active=board";
  }, 300);
}
