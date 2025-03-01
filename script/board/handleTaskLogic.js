/**
 * Retrieves elements for task creation.
 *
 */
function getAddTaskElements() {
  return {
    addTaskTitle: document.getElementById("addTaskTitle"),
    addTaskDescription: document.getElementById("addTaskDescription"),
    addTaskDate: document.getElementById("addTaskDate"),
    addTaskSubTasks: document.querySelectorAll("#subtaskList .subtaskText"),
    addTaskCategory: document.getElementById("selectTask"),
    assignedContacts: getSelectedContacts(),
  };
}

/**
 * Retrieves selected contacts.
 *
 */
function getSelectedContacts() {
  return Array.from(document.querySelectorAll(".contactCheckbox:checked")).map(
    (checkbox) => ({
      name: checkbox.value,
    })
  );
}

/**
 * Retrieves checked contacts.
 *
 */
function getCheckedSelectedContacts() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("boardSection");
}

/**
 * Gets "boardSection" from URL.
 *
 */
function getBoardSectionFromURL() {
  return new URLSearchParams(window.location.search).get("boardSection");
}

/**
 * Validates task inputs.
 *
 */
function validateTaskInputs(title, date, category) {
  clearError();
  let isValid = true;
  if (!title.value.trim()) {
    isValid =
      showError("errorMessageAddTaskTitle", "This field is required") && false;
  }

  if (!date.value.trim()) {
    isValid =
      showError("errorMessageAddTaskDueDate", "This field is required") &&
      false;
  }

  if (!category.value.trim()) {
    isValid =
      showError("errorMessageAddTaskCategory", "This field is required") &&
      false;
  }
  return isValid;
}

/*Returns the input element that caused the error.
 *
 * @param {HTMLElement} inputElement - The input element in question.
 * @returns {HTMLElement} - The input element.
 */
function getErrorTarget(inputElement) {
  return inputElement;
}

/**
 * Displays an error message.
 *
 */
function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

/**
 * Clears error messages.
 *
 * */
function clearError() {
  const errorElementTitle = document.getElementById("errorMessageAddTaskTitle");
  const errorElementDueDate = document.getElementById(
    "errorMessageAddTaskDueDate"
  );
  const errorElementCategory = document.getElementById(
    "errorMessageAddTaskCategory"
  );

  errorElementTitle.innerHTML = "";
  errorElementDueDate.innerHTML = "";
  errorElementCategory.innerHTML = "";
}

/**
 * Creates a task object from the given elements and selected board section.
 *
 * @param {Object} elements - The DOM elements containing task details.
 * @param {string} selectedBoardSection - The board section the task will be assigned to.
 * @returns {Object} The task object with all its details.
 */
function createTaskObject(elements, selectedBoardSection) {
  const subtasksArray = mapSubtasks(elements.addTaskSubTasks);
  return {
    assignedTo: elements.assignedContacts,
    title: elements.addTaskTitle.value,
    category: elements.addTaskCategory.value,
    description: elements.addTaskDescription.value,
    dueDate: elements.addTaskDate.value,
    priority: formatPriority(selectedPriority),
    status: selectedBoardSection || "To do",
    subtask: subtasksArray,
  };
}

/**
 * Maps the subtasks into an array of objects with text and completed properties.
 *
 * @param {NodeList} subtasks - The DOM nodes for the subtasks.
 * @returns {Array} The mapped subtasks array.
 */
function mapSubtasks(subtasks) {
  return Array.from(subtasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));
}

/**
 * Formats the priority string to capitalize the first letter.
 *
 * @param {string} priority - The selected priority string.
 * @returns {string} The formatted priority.
 */
function formatPriority(priority) {
  return String(priority).charAt(0).toUpperCase() + String(priority).slice(1);
}

/**
 * Creates and adds a task to the board by gathering inputs and pushing to the backend.
 *
 * @returns {Promise<void>} Resolves after task creation and sync with the backend.
 */
async function createTasksForBoard() {
  const elements = getAddTaskElements();
  const selectedBoardSection =
    window.innerWidth <= 1000 ? getBoardSectionFromURL() : null;

  if (
    !validateTaskInputs(
      elements.addTaskTitle,
      elements.addTaskDate,
      elements.addTaskCategory
    )
  )
    return;

  const newTask = createTaskObject(elements, selectedBoardSection);
  await showTaskCreatedMessage();
  await pushTaskToBackendData(newTask);
  await syncBackendDataWithFirebase();
  loadTasksToBoard();
  window.location.href = "/html/board.html?active=board";
}

/**
 * Edits task details for a board.
 *
 * Fetches data, updates task properties, and syncs with the backend.
 * @param {string} taskId - The ID of the task to edit.
 */
async function editTasksForBoard(taskId) {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const elements = getAddTaskElements();
  const subtasksArray = mapSubtasks(elements.addTaskSubTasks);
  updateTaskData(tasks, taskId, elements, subtasksArray);
  await syncBackendDataWithFirebase();
  await closeTaskOverlay();
  loadTasksToBoard();
  location.reload();
}

/**
 * Maps the subtasks from the DOM elements.
 *
 * @param {NodeList} addTaskSubTasks - The subtasks DOM nodes.
 * @returns {Array} - Array of subtasks with text and completed status.
 */
function mapSubtasks(addTaskSubTasks) {
  return Array.from(addTaskSubTasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));
}

/**
 * Updates task data with the new input values.
 *
 * @param {Object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task to update.
 * @param {Object} elements - The DOM elements containing the new data.
 * @param {Array} subtasksArray - The updated subtasks array.
 */
function updateTaskData(tasks, taskId, elements, subtasksArray) {
  tasks[taskId] = {
    ...tasks[taskId],
    assignedTo: getSelectedContacts(),
    title: elements.addTaskTitle.value,
    description: elements.addTaskDescription.value,
    dueDate: elements.addTaskDate.value,
    priority: formatPriority(selectedPriority),
    status: tasks[taskId].status,
    subtask: subtasksArray,
  };
}

/**
 * Capitalizes and formats the priority value.
 *
 * @param {string} priority - The priority string.
 * @returns {string} - The formatted priority string.
 */
function formatPriority(priority) {
  return String(priority).charAt(0).toUpperCase() + String(priority).slice(1);
}

/**
 * Deletes a task.
 *
 */
async function deleteTask() {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const boardOverlayTaskTitle = document.querySelector(
    ".boardOverlayTaskTitle"
  );
  closeBoardOverlay();
  for (const taskId in tasks) {
    if (tasks[taskId].title === boardOverlayTaskTitle.textContent) {
      delete tasks[taskId];
    }
  }

  if (Object.keys(tasks).length === 0) {
    backendData.Data.Tasks = {};
  }
  await syncBackendDataWithFirebase();
  loadTasksToBoard();
  location.reload();
}

/*
 * Edits an existing task in the board.
 *
 * @async
 */
async function editTask(taskId) {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const { overlayBoardContent, boardOverlay } = getBoardElements();
  const boardOverlayTaskTitle = document.querySelector(
    ".boardOverlayTaskTitle"
  );

  if (tasks[taskId].title === boardOverlayTaskTitle.textContent) {
    overlayBoardContent.innerHTML = templateEditTask(tasks[taskId], taskId);
    boardOverlay.classList.remove("hideOverlay");
    setPriority(String(tasks[taskId].priority).toLowerCase());
    loadContacts(tasks[taskId].assignedTo);
  }
  loadTasksToBoard();
  initFlatpickr();
}

/**
 * Syncs backend data with Firebase.
 *
 */
async function syncBackendDataWithFirebase() {
  await fetch(
    "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendData),
    }
  );
}

/**
 * Saves task to backend.
 *
 */
async function pushTaskToBackendData(task) {
  await fetchDataJSON();
  if (!backendData.Data.Tasks) backendData.Data.Tasks = {};
  const tasks = backendData.Data.Tasks;
  let newTaskId = `taskId${Object.keys(tasks).length}`;
  tasks[newTaskId] = task;
}

/**
 * Displays task creation message.
 *
 */
async function showTaskCreatedMessage() {
  return new Promise((resolve) => {
    const message = document.createElement("div");
    message.className = "createdTaskContainer";
    message.innerHTML = insertTaskCreatedMessage();
    document.body.appendChild(message);
    setTimeout(() => {
      message.classList.add("fadeOut");
      setTimeout(() => {
        message.remove();
        resolve();
      }, 300);
    }, 1000);
  });
}
