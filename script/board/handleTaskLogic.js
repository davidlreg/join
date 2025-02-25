/**
 * Retrieves all elements related to adding a task.
 *
 * @returns {Object} Elements required for task creation.
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
 * Retrieves the list of selected contacts.
 *
 * @returns {Array<Object>} Array of selected contacts.
 */
function getSelectedContacts() {
  return Array.from(document.querySelectorAll(".contactCheckbox:checked")).map((checkbox) => ({
    name: checkbox.value,
  }));
}

/**
 * Retrieves selected contacts for a task.
 *
 * @returns {Array<string>} Array of checked contact names.
 */
function getCheckedSelectedContacts() {
  return Array.from(document.querySelectorAll("#selectedContacts .profilePicture")).map((el) => el.getAttribute("title"));
}

/**
 * Retrieves the "boardSection" parameter from the URL.
 *
 * @returns {string|null} The value of the "boardSection" parameter, or null if not found.
 */
function getBoardSectionFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("boardSection");
}

/**
 * Validates task input fields.
 *
 * @param {HTMLElement} title - The task title input field.
 * @param {HTMLElement} date - The due date input field.
 * @param {HTMLElement} category - The task category input field.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateTaskInputs(title, date, category) {
  clearError(title);
  clearError(date);
  clearError(category);

  let isValid = true;
  if (!title.value.trim()) {
    isValid = showError(title, "This field is required") && false;
  }
  if (!date.value.trim()) {
    isValid = showError(date, "This field is required") && false;
  }
  if (!category.value.trim()) {
    isValid = showError(category, "This field is required") && false;
  }

  return isValid;
}

/**
 * Displays an error message for an input field.
 *
 * @param {HTMLElement} inputElement - The input field to show the error for.
 * @param {string} message - The error message to display.
 * @returns {boolean} Always returns false.
 */
function showError(inputElement, message) {
  let targetElement = getErrorTarget(inputElement);
  targetElement.classList.add("errorBorder");

  const errorMessage = document.createElement("span");
  errorMessage.classList.add("errorMessage");
  errorMessage.textContent = message;
  targetElement.insertAdjacentElement("afterend", errorMessage);

  setTimeout(() => clearError(inputElement), 3000);
  return false;
}

/**
 * Clears error indications from an input field.
 *
 * @param {HTMLElement} inputElement - The input field to clear errors from.
 */
function clearError(inputElement) {
  let targetElement = inputElement.id === "selectTask" ? inputElement.closest(".dropdown") : inputElement;
  if (targetElement) {
    targetElement.classList.remove("errorBorder");

    const existingError = targetElement.parentNode.querySelector(".errorMessage");
    if (existingError) existingError.remove();
  }
}

/**
 * Creates a new task object from input fields.
 *
 * @param {Object} elements - The elements containing task data.
 * @param {string|null} selectedBoardSection - The selected board section.
 * @returns {Object} The constructed task object.
 */
function createTaskObject(elements, selectedBoardSection) {
  const subtasksArray = Array.from(elements.addTaskSubTasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));

  return {
    assignedTo: elements.assignedContacts,
    title: elements.addTaskTitle.value,
    category: elements.addTaskCategory.value,
    description: elements.addTaskDescription.value,
    dueDate: elements.addTaskDate.value,
    priority: String(selectedPriority).charAt(0).toUpperCase() + String(selectedPriority).slice(1),
    status: selectedBoardSection || "To do",
    subtask: subtasksArray,
  };
}

/**
 * Creates a new task and adds it to the board.
 *
 * @async
 * @returns {Promise<void>} Resolves when the task is created and the page is redirected.
 */
async function createTasksForBoard() {
  const elements = getAddTaskElements();
  const selectedBoardSection = window.innerWidth <= 1000 ? getBoardSectionFromURL() : null;

  if (!validateTaskInputs(elements.addTaskTitle, elements.addTaskDate, elements.addTaskCategory)) return;

  const newTask = createTaskObject(elements, selectedBoardSection);
  await showTaskCreatedMessage();
  await pushTaskToBackendData(newTask);
  await syncBackendDataWithFirebase();
  loadTasksToBoard();
  window.location.href = "/html/board.html?active=board";
}

/**
 * Edits an existing task in the board.
 *
 * @async
 * @param {string} taskId - The ID of the task to edit.
 */
async function editTasksForBoard(taskId) {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const elements = getAddTaskElements();
  const subtasksArray = Array.from(elements.addTaskSubTasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));
  const assignedContacts = getSelectedContacts();

  tasks[taskId] = {
    ...tasks[taskId],
    assignedTo: assignedContacts,
    title: elements.addTaskTitle.value,
    description: elements.addTaskDescription.value,
    dueDate: elements.addTaskDate.value,
    priority: String(selectedPriority).charAt(0).toUpperCase() + String(selectedPriority).slice(1),
    status: tasks[taskId].status,
    subtask: subtasksArray,
  };

  await syncBackendDataWithFirebase();
  await closeTaskOverlay();
  loadTasksToBoard();
  location.reload();
}

/**
 * Deletes a task from the board.
 *
 * @async
 */
async function deleteTask() {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const boardOverlayTaskTitle = document.querySelector(".boardOverlayTaskTitle");
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

/**
 * Synchronizes the global `backendData` with Firebase.
 *
 * @async
 * @returns {Promise<void>} Resolves when the data is successfully pushed.
 */
async function syncBackendDataWithFirebase() {
  await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(backendData),
  });
}

/**
 * Saves the given task into the global backendData.
 *
 * @async
 * @param {Object} task - The task object to be saved.
 * @returns {Promise<void>} Resolves when the task is stored.
 */
async function pushTaskToBackendData(task) {
  await fetchDataJSON();
  if (!backendData.Data.Tasks) backendData.Data.Tasks = {};

  const tasks = backendData.Data.Tasks;
  let newTaskId = `taskId${Object.keys(tasks).length}`;
  tasks[newTaskId] = task;
}

/**
 * Displays a task creation message.
 *
 * @async
 * @returns {Promise<void>} Resolves after the message is displayed and fades out.
 */
async function showTaskCreatedMessage() {
  return new Promise((resolve) => {
    const message = document.createElement("div");
    message.className = "createdTaskContainer";
    message.innerHTML = `
      <div class="taskSuccessfullyCreated">
        <p>Task added to board</p>
        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.9544 5.75564L22.9545 26.21C22.9538 26.8125 22.7142 27.3903 22.2881 27.8163C21.862 28.2424 21.2843 28.4821 20.6817 28.4827L16.1363 28.4827C15.5338 28.4821 14.956 28.2424 14.53 27.8163C14.1039 27.3903 13.8642 26.8125 13.8636 26.21L13.8636 5.75564C13.8642 5.15306 14.1039 4.57534 14.53 4.14926C14.956 3.72317 15.5338 3.48353 16.1363 3.48293L20.6817 3.48293C21.2843 3.48353 21.862 3.72317 22.2881 4.14926C22.7142 4.57534 22.9538 5.15306 22.9544 5.75564ZM16.1363 26.21L20.6817 26.21L20.6817 5.75564L16.1363 5.75564L16.1363 26.21Z" fill="black"/>
        </svg>
      </div>
    `;
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
