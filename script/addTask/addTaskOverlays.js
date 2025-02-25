/**
 * Global variable to store the selected board section.
 * It is used to determine where the new task should be added.
 * 
 * @type {string | null}
 */
let selectedBoardSection = null;

/**
 * Opens the task overlay or redirects to the add task page on smaller screens.
 * 
 * If the window width is 1400px or less, the function redirects to the addTask page 
 * while passing the board section as a URL parameter.
 * Otherwise, it dynamically loads the task creation form inside the overlay.
 * 
 * @param {string} boardSection - The board section where the new task will be added.
 */
function addTaskOverlay(boardSection) {
  let overlay = document.getElementById('addTaskOverlay');
  let dynamicContent = document.getElementById('overlayDynamicContent');

  if (window.innerWidth <= 1000) {
    window.location.href = `http://127.0.0.1:5500/html/addTask.html?active=addTask&boardSection=${encodeURIComponent(boardSection)}`;
  } else {
    let addTaskHtml = addTaskHtmlTemplate();
    dynamicContent.innerHTML = addTaskHtml;
    overlay.classList.remove('hidden');
    selectedBoardSection = boardSection;
    setTimeout(() => {
      document.querySelector('.overlayTaskContent').classList.add('animate');
    }, 50);
  }
  
}

/**
 * Closes the task overlay with an animation effect.
 * 
 * If the overlay exists, the function removes the animation class and applies a slide-out effect. 
 * After the animation duration (300ms), it hides the overlay.
 * If the overlay does not exist (e.g., on mobile view), the function redirects to the board page.
 */
function closeTaskOverlay() {
    const overlay = document.getElementById('addTaskOverlay');
    const content = document.querySelector('.overlayTaskContent');

    if (overlay && content) {
        content.classList.remove('animate'); 
        content.style.animation = "slideOut 0.3s ease-in forwards";
        setTimeout(() => {
            overlay.classList.add('hidden');
            content.style.animation = ""; 
        }, 300); 
        window.location.href = "/html/board.html?active=board";
    }
}
