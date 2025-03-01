let backendData = {};

/**
 * Fetches data from the backend and stores it in the global `backendData` variable.
 *
 * @async
 */
async function fetchDataJSON() {
  const response = await fetch(
    "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  const responseJSON = await response.json();
  backendData = responseJSON;
}

/**
 * Initializes the application.
 *
 * @async
 */
async function init() {
  setActiveLinkFromURL();
  await loadData();
  headerUserName();
  await loadTasksToBoard();
  checkIfTaskExistInContainer();
  changeInputBoardLocation();
}

/**
 * Loads data from the backend.
 *
 * @async
 */
async function loadData() {
  await fetchDataJSON();
}

/**
 * Loads all tasks from the backend and categorizes them into different board sections.
 *
 * @async
 */
async function loadTasksToBoard() {
  await fetchDataJSON();

  let tasks = backendData.Data.Tasks;
  const {
    boardSectionTasksToDo,
    boardSectionTasksInProgress,
    boardSectionTasksAwaiting,
    boardSectionTasksDone,
  } = getBoardElements();

  clearBoardSections();

  Object.keys(tasks).forEach((taskId) => {
    let task = tasks[taskId];
    let taskHtml = templateBoardTasks(task, taskId);
    categorizeTask(
      task,
      taskHtml,
      boardSectionTasksToDo,
      boardSectionTasksInProgress,
      boardSectionTasksAwaiting,
      boardSectionTasksDone
    );
  });

  setRightBackgroundColorForCategory();
}

/**
 * Clears the content of the board sections.
 *
 */
function clearBoardSections() {
  document.getElementById("boardNoTasksToDo").innerHTML = "";
  document.getElementById("boardNoTasksInProgress").innerHTML = "";
  document.getElementById("boardNoTasksAwaiting").innerHTML = "";
  document.getElementById("boardNoTasksDone").innerHTML = "";
}

/**
 * Categorizes a task based on its status and appends it to the appropriate board section.
 *
 * @param {Object} task The task object.
 * @param {string} taskHtml The HTML string for the task.
 * @param {HTMLElement} toDoSection The "To do" section.
 * @param {HTMLElement} inProgressSection The "In progress" section.
 * @param {HTMLElement} awaitingSection The "Awaiting Feedback" section.
 * @param {HTMLElement} doneSection The "Done" section.
 */
function categorizeTask(
  task,
  taskHtml,
  toDoSection,
  inProgressSection,
  awaitingSection,
  doneSection
) {
  if (task.status === "To do") {
    setIdToCreateTasks(toDoSection, taskHtml);
  } else if (task.status === "In progress") {
    setIdToCreateTasks(inProgressSection, taskHtml);
  } else if (task.status === "Await Feedback") {
    setIdToCreateTasks(awaitingSection, taskHtml);
  } else if (task.status === "Done") {
    setIdToCreateTasks(doneSection, taskHtml);
  }
}

/**
 * Retrieves board elements.
 *
 * @returns {Object} Board elements.
 */
function getBoardElements() {
  return {
    boardOverlay: document.getElementById("addBoardOverlay"),
    overlayBoardContent: document.getElementById("overlayBoardContent"),
    boardSectionTasksToDo: document.getElementById("boardNoTasksToDo"),
    boardSectionTasksInProgress: document.getElementById(
      "boardNoTasksInProgress"
    ),
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
    const addBoardHtml = templateBoardOverlay(task, taskId);
    overlayBoardContent.innerHTML = addBoardHtml;
    boardOverlay.classList.remove("hideOverlay");
    setRightBackgroundColorForCategoryinDetailView();
  } else {
    console.error("Task not found:", taskId);
  }
}

/**
 * Closes the board overlay.
 *
 */
function closeBoardOverlay() {
  const boardOverlay = document.getElementById("addBoardOverlay");
  const overlayBoardContent = document.querySelector(".boardOverlayContainer");

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
  const categoryElement = document.querySelectorAll(".boardTaskCategory");

  categoryElement.forEach((categoryElement) => {
    const category = categoryElement.textContent.trim();

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
    "#FF8C00",
    "#FF69B4",
    "#8A2BE2",
    "#800080",
    "#00BFFF",
    "#40E0D0",
    "#FF6347",
    "#FFA07A",
    "#FF77FF",
    "#FFD700",
    "#0000FF",
    "#ADFF2F",
    "#FF4500",
    "#FFA500",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let index = Math.abs(hash) % colorPalette.length;

  return colorPalette[index];
}

/**
 * Toggles the completion status of a subtask.
 *
 * @param {string} taskId - The ID of the task.
 * @param {number} subtaskIndex - The index of the subtask.
 * @async
 */
async function toggleSubtask(taskId, subtaskIndex) {
  await fetchDataJSON();
  let task = backendData.Data.Tasks[taskId];

  if (!task || !Array.isArray(task.subtask)) {
    return;
  }

  task.subtask[subtaskIndex].completed = !task.subtask[subtaskIndex].completed;
  updateProgressBar(taskId);
  await syncBackendDataWithFirebase();
}

/**
 * Updates the progress bar for a task.
 *
 * @param {string} taskId - The ID of the task.
 */
function updateProgressBar(taskId) {
  let task = backendData.Data.Tasks[taskId];

  if (!task || !Array.isArray(task.subtask)) return;

  let { completedSubtasks, totalSubtasks } = calculateSubtaskProgress(
    task.subtask
  );
  let progressPercentage =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  let progressColor = progressPercentage === 100 ? "#28a745" : "#007bff";

  setProgressBar(taskId, progressPercentage, progressColor);
  updateCompletedSubtasks(taskId, completedSubtasks, totalSubtasks);
}

/**
 * Calculates the number of completed subtasks and total subtasks.
 *
 * @param {Array} subtasks - List of subtasks.
 * @returns {Object} - Object containing completed and total subtasks count.
 */
function calculateSubtaskProgress(subtasks) {
  let completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed
  ).length;
  let totalSubtasks = subtasks.length;
  return { completedSubtasks, totalSubtasks };
}

/**
 * Updates the visual progress bar.
 *
 * @param {string} taskId - The ID of the task.
 * @param {number} progressPercentage - The completion percentage.
 * @param {string} progressColor - The color of the progress bar.
 */
function setProgressBar(taskId, progressPercentage, progressColor) {
  let progressBar = document.querySelector(
    `.boardSubtaskProgressBar[data-task-id="${taskId}"]`
  );
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.style.backgroundColor = progressColor;
  }
}

/**
 * Updates the the completed subtasks of the task
 *
 * @param {string} taskId - The id of the task
 */

function updateCompletedSubtasks(taskId, completedSubtasks, totalSubtasks) {
  let updateSubtaskStatus = document.querySelector(
    `.boardSubTasks[data-task-id="${taskId}"] span`
  );
  if (updateSubtaskStatus) {
    updateSubtaskStatus.textContent = `${completedSubtasks}/${totalSubtasks} Subtasks`;
  }
}

/**
 * Shows a tooltip with the specified text.
 *
 * @param {MouseEvent} event - The mouse event.
 * @param {string} text - The text to display in the tooltip.
 */
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

/**
 * Hides the tooltip.
 *
 */
function hideTooltip() {
  let tooltip = document.getElementById("tooltip");
  if (tooltip) tooltip.style.display = "none";
}

/**
 * Sets the background color for each task category based on its type.
 *
 */
function setRightBackgroundColorForCategoryinDetailView() {
  const categoryElement = document.querySelectorAll(
    ".boardOverlayTaskCategory"
  );

  categoryElement.forEach((categoryElement) => {
    const category = categoryElement.textContent.trim();

    if (category === "User Story") {
      categoryElement.style.backgroundColor = "#0038FF";
    } else if (category === "Technical Task") {
      categoryElement.style.backgroundColor = "#20D7C2";
    }
  });
}
