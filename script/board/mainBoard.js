let backendData = {};

/**
 * Fetches data from the backend and stores it in the global `backendData` variable.
 *
 * @async
 */
async function fetchDataJSON() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
  let responseJSON = await response.json();
  backendData = responseJSON;
}

/**
 * Initializes the application by setting the active link, loading data,
 * updating the header user name, loading tasks, and checking existing tasks.
 *
 * @async
 */
async function init() {
  setActiveLinkFromURL();
  await loadData();
  headerUserName();
  await loadTasksToBoard();
  checkIfTaskExistInContainer();
}

/**
 * Loads data from the backend by calling `fetchDataJSON`.
 *
 * @async
 */
async function loadData() {
  await fetchDataJSON();
}

/**
 * Loads all tasks from the backend and adds them to the board.
 * It sorts tasks into appropriate sections based on their status.
 *
 * @async
 */
async function loadTasksToBoard() {
  await fetchDataJSON();

  let tasks = backendData.Data.Tasks;

  const { boardSectionTasksToDo, boardSectionTasksInProgress, boardSectionTasksAwaiting, boardSectionTasksDone } = getBoardElements();

  let toDoTemplateRef = document.getElementById("boardNoTasksToDo");
  toDoTemplateRef.innerHTML = "";
  let inProgressTemplateRef = document.getElementById("boardNoTasksInProgress");
  inProgressTemplateRef.innerHTML = "";
  let awaitFeedbackTemplateRef = document.getElementById("boardNoTasksAwaiting");
  awaitFeedbackTemplateRef.innerHTML = "";
  let doneTemplateRef = document.getElementById("boardNoTasksDone");
  doneTemplateRef.innerHTML = "";

  Object.keys(tasks).forEach((taskId) => {
    let task = tasks[taskId];
    let taskHtml = templateBoardTasks(task, taskId);

    if (task.status === "To do") {
      setIdToCreateTasks(boardSectionTasksToDo, taskHtml);
    } else if (task.status === "In progress") {
      setIdToCreateTasks(boardSectionTasksInProgress, taskHtml);
    } else if (task.status === "Await Feedback") {
      setIdToCreateTasks(boardSectionTasksAwaiting, taskHtml);
    } else if (task.status === "Done") {
      setIdToCreateTasks(boardSectionTasksDone, taskHtml);
    }
  });

  setRightBackgroundColorForCategory();
}

/**
 * Retrieves board elements and returns them as an object.
 *
 * @returns {Object} Board elements.
 */
function getBoardElements() {
  return {
    boardOverlay: document.getElementById("addBoardOverlay"),
    overlayBoardContent: document.getElementById("overlayBoardContent"),
    boardSectionTasksToDo: document.getElementById("boardNoTasksToDo"),
    boardSectionTasksInProgress: document.getElementById("boardNoTasksInProgress"),
    boardSectionTasksAwaiting: document.getElementById("boardNoTasksAwaiting"),
    boardSectionTasksDone: document.getElementById("boardNoTasksDone"),
  };
}

/**
 * Displays the board overlay for a given task.
 *
 * @async
 * @param {string} taskId - The ID of the task to display.
 */
async function addBoardOverlay(taskId) {
  await fetchDataJSON(); 
  const { boardOverlay, overlayBoardContent } = getBoardElements();
  let tasks = backendData.Data.Tasks;

  let task = tasks[taskId];

  if (task) {
      task.id = taskId; 

      let addBoardHtml = templateBoardOverlay(task, taskId);
      overlayBoardContent.innerHTML = addBoardHtml;
      boardOverlay.classList.remove("hideOverlay");
  } else {
      console.error("Task mit dieser ID nicht gefunden:", taskId);
  }
}

/**
 * Closes the board overlay.
 *
 */
function closeBoardOverlay() {
  let boardOverlay = document.getElementById("addBoardOverlay");
  let overlayBoardContent = document.querySelector(".boardOverlayContainer");

  if (boardOverlay && overlayBoardContent) {
    overlayBoardContent.classList.remove("animate");
    overlayBoardContent.style.animation = "slideOut 0.3s ease-in forwards";
    setTimeout(() => {
      boardOverlay.classList.add("hideOverlay");
      overlayBoardContent.style.animation = "";
    }, 300);
  }
}

/**
 * Adds a task to the specified board section.
 *
 * @param {HTMLElement} boardSectionId - The board section to add the task to.
 * @param {string} taskHtml - The task HTML to insert.
 */
function setIdToCreateTasks(boardSectionId, taskHtml) {
  if (boardSectionId.classList.contains("boardButton")) {
    boardSectionId.classList.replace("boardButton", "boardTemplate");
    boardSectionId.textContent = "";
    boardSectionId.style.backgroundColor = "transparent";
  }

  boardSectionId.insertAdjacentHTML("beforeend", taskHtml);
}

/**
 * Sets the background color for each task category based on its type.
 *
 */
function setRightBackgroundColorForCategory() {
  let categoryElement = document.querySelectorAll(".boardTaskCategory");

  categoryElement.forEach((categoryElement) => {
    let category = categoryElement.textContent.trim();

    if (category === "User Story") {
      categoryElement.style.backgroundColor = "#0038FF";
    } else if (category === "Technical Task") {
      categoryElement.style.backgroundColor = "#20D7C2";
    }
  });
}

/**
 * Generates a random but consistent HSL color based on a given name.
 *
 * @param {string} name - The input string used to generate the color.
 * @returns {string} A HSL color string (e.g., "hsl(210, 70%, 60%)").
 */
function getRandomColorForName(name) {
  const colorPalette = [
    "#FF8C00", "#FF69B4", "#8A2BE2", 
    "#800080", "#00BFFF", "#40E0D0", 
    "#FF6347", "#FFA07A", "#FF77FF", 
    "#FFD700", "#0000FF", "#ADFF2F", 
    "#FF4500", "#FFA500"  
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let index = Math.abs(hash) % colorPalette.length;

  return colorPalette[index];
}


async function toggleSubtask(taskId, subtaskIndex) {
  await fetchDataJSON();
  let task = backendData.Data.Tasks[taskId];

  if (!task || !Array.isArray(task.subtask)) {
      return;
  }

  task.subtask[subtaskIndex].completed = !task.subtask[subtaskIndex].completed;

  await syncBackendDataWithFirebase();
  updateProgressBar(taskId);
}


function updateProgressBar(taskId) {
  let task = backendData.Data.Tasks[taskId];

  if (!task || !Array.isArray(task.subtask)) return;

  let completedSubtasks = task.subtask.filter(subtask => subtask.completed).length;
  let totalSubtasks = task.subtask.length;
  let progressPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  let progressColor = progressPercentage === 100 ? "#28a745" : "#007bff";

  let progressBar = document.querySelector(`.boardSubtaskProgressBar[data-task-id="${taskId}"]`);

  if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
      progressBar.style.backgroundColor = progressColor;
  }
}


function showTooltip(event, text) {
  hideTooltip();
  let tooltip = document.getElementById("tooltip");
  if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "tooltip";
      tooltip.className = "tooltip";
      document.body.appendChild(tooltip);
  }
  tooltip.innerText = text;
  tooltip.style.left = `${event.clientX + 20}px`;
  tooltip.style.top = `${event.clientY - 5}px`;
  tooltip.style.display = "block";
}

function hideTooltip() {
  let tooltip = document.getElementById("tooltip");
  if (tooltip) tooltip.style.display = "none";
}

