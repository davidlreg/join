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
  let overlay = document.getElementById("addTaskOverlay");
  let dynamicContent = document.getElementById("overlayDynamicContent");

  if (window.innerWidth <= 1000) {
    window.location.href = `http://127.0.0.1:5500/html/addTask.html?active=addTask&boardSection=${encodeURIComponent(boardSection)}`;
  } else {
    let addTaskHtml = addTaskHtmlTemplate();
    dynamicContent.innerHTML = addTaskHtml;
    overlay.classList.remove("hidden");
    selectedBoardSection = boardSection;
    setTimeout(() => {
      document.querySelector(".overlayTaskContent").classList.add("animate");
    }, 50);
  }
}

/**
 * Closes the task overlay with an animation effect or redirects to the board page.
 *
 */
function closeTaskOverlay() {
  const overlay = document.getElementById("addTaskOverlay");
  const content = document.querySelector(".overlayTaskContent");

  if (overlay && content) {
    content.classList.remove("animate");
    content.style.animation = "slideOut 0.3s ease-in forwards";
    setTimeout(() => {
      overlay.classList.add("hidden");
      content.style.animation = "";
    }, 300);
    window.location.href = "/html/board.html?active=board";
  }
}
