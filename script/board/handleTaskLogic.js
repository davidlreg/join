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
  const selectedContacts = [];
  document.querySelectorAll(".contactCheckbox:checked").forEach((checkbox) => {
    selectedContacts.push({
      name: checkbox.value,
    });
  });

  return selectedContacts;
}

function checkedSelectedContacts() {
  checkedContacts = [];
  document.querySelectorAll('#selectedContacts .profilePicture').forEach((el) => {
    checkedContacts.push(el.getAttribute("title"));
  });
  return checkedContacts;
}

/**
 * Retrieves the "boardSection" parameter from the URL.
 * This is used when navigating to the addTask page on smaller screens (under 1400px),
 * ensuring that the task is assigned to the correct board section.
 * 
 * @returns {string|null} The value of the "boardSection" parameter, or null if not found.
 */
function getBoardSectionFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('boardSection');
}

/**
 * Creates a new task and adds it to the board.
 * If the window width is 1400px or less, it retrieves the board section from the URL.
 * The function validates input fields, constructs a task object, and pushes it to the backend.
 * Finally, it synchronizes the data and reloads the board.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves once the task is created and the page is redirected.
 */
async function createTasksForBoard() {
  const { addTaskTitle, addTaskDescription, addTaskDate, addTaskCategory, addTaskSubTasks, assignedContacts } = getAddTaskElements();

  if (window.innerWidth <= 1400) {
    selectedBoardSection = getBoardSectionFromURL();
  }

  if (!validateTaskInputs(addTaskTitle, addTaskDate, addTaskCategory)) return;

  let subtasksArray = Array.from(addTaskSubTasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));

  let newTask = {
    assignedTo: assignedContacts,
    title: addTaskTitle.value,
    category: addTaskCategory.value,
    description: addTaskDescription.value,
    dueDate: addTaskDate.value,
    priority: String(selectedPriority).charAt(0).toUpperCase() + String(selectedPriority).slice(1),
    status: selectedBoardSection || "To do",
    subtask: subtasksArray,
  };
  await pushTaskToBackendData(newTask);
  await syncBackendDataWithFirebase();
  loadTasksToBoard();
  window.location.href = "/html/board.html";
}



/**
 * Validates if the required task input fields are filled.
 * If a field is empty, it displays an error message and prevents form submission.
 * 
 * @param {HTMLElement} title - The input field for the task title.
 * @param {HTMLElement} date - The input field for the due date.
 * @param {HTMLElement} category - The input field for the task category.
 */
function validateTaskInputs(title, date, category) {
  let isValid = true;

  clearError(title);
  clearError(date);
  clearError(category);

  if (!title.value.trim()) {
    showError(title, "This field is required");
    isValid = false;
  }
  if (!date.value.trim()) {
    showError(date, "This field is required");
    isValid = false;
  }
  if (!category.value.trim()) {
    showError(category, "This field is required");
    isValid = false;
  }

  return isValid;
}


/**
 * Displays an error message below the input field and adds a red border.
 *
 * The error message disappears automatically after 3 seconds.
 *
 * @param {HTMLElement} inputElement - The input field where the error occurred.
 * @param {string} message - The error message to be displayed.
 */
function showError(inputElement, message) {
  let targetElement = getErrorTarget(inputElement);

  targetElement.classList.add("errorBorder");

  let errorMessage = document.createElement("span");
  errorMessage.classList.add("errorMessage");
  errorMessage.textContent = message;

  targetElement.insertAdjacentElement("afterend", errorMessage);

  setTimeout(() => {
    clearError(inputElement);
  }, 3000);
}


/**
 * Determines the correct element where the error should be displayed.
 *
 * If the input field is the category dropdown, it returns the `.dropdown` container.
 * Otherwise, it returns the input field itself.
 *
 * @param {HTMLElement} inputElement - The input field being validated.
 * @returns {HTMLElement} - The element where the error styling should be applied.
 */
function getErrorTarget(inputElement){
  if(inputElement.id === "selectTask") {
    return inputElement.closest(".dropdown");
  }

  return inputElement;
}


/**
 * Removes the visual error indication from an input field or dropdown.
 * 
 * @param {HTMLElement} inputElement - The input element (text field or dropdown) 
 *                                      from which the error indication should be removed.
 *                                      If `inputElement` is the category dropdown (`selectTask`), 
 *                                      the error indication is removed from the entire `.dropdown` container.
 */
function clearError(inputElement) {
  let targetElement = inputElement;

  if (inputElement.id === "selectTask") {
    targetElement = inputElement.closest(".dropdown");
  }

  targetElement.classList.remove("errorBorder");

  let existingError = targetElement.parentNode.querySelector(".errorMessage");
  if (existingError) existingError.remove();
}




async function editTasksForBoard(taskId) {
  await fetchDataJSON();
  let tasks = backendData.Data.Tasks;

  const { addTaskTitle, addTaskDescription, addTaskDate, addTaskSubTasks, assignedContacts } = getAddTaskElements();

  let subtasksArray = Array.from(addTaskSubTasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));

  tasks[taskId] = {
    ...tasks[taskId],
    assignedTo: assignedContacts,
    title: addTaskTitle.value,
    description: addTaskDescription.value,
    dueDate: addTaskDate.value,
    priority: String(selectedPriority).charAt(0).toUpperCase() + String(selectedPriority).slice(1),
    status: tasks[taskId].status,
    subtask: subtasksArray,
  };

  await syncBackendDataWithFirebase();

  closeTaskOverlay();
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
  let tasks = backendData.Data.Tasks;
  const boardOverlayTaskTitle = document.querySelector(".boardOverlayTaskTitle");
  closeBoardOverlay();

  Object.keys(tasks).forEach((taskId) => {
    let task = tasks[taskId];
    if (task.title === boardOverlayTaskTitle.textContent) {
      delete tasks[taskId];
    }
  });

  if (Object.keys(tasks).length === 0) {
    backendData.Data.Tasks = {};
  }

  await syncBackendDataWithFirebase();
  loadTasksToBoard();
  location.reload();
}

/**
 * Edits an existing task in the board.
 *
 * @async
 */
async function editTask(taskId) {
  await fetchDataJSON();
  let tasks = backendData.Data.Tasks;
  const { overlayBoardContent, boardOverlay } = getBoardElements();
  const boardOverlayTaskTitle = document.querySelector(".boardOverlayTaskTitle");

  if (tasks[taskId].title === boardOverlayTaskTitle.textContent) {
    overlayBoardContent.innerHTML = templateEditTask(tasks[taskId], taskId);
    boardOverlay.classList.remove("hideOverlay");
    setPriority(String(tasks[taskId].priority).toLowerCase());
    loadContacts();
  }
  loadTasksToBoard();
}

/**
 * Synchronizes the global `backendData` with Firebase.
 *
 * Sends a PUT request to update the Firebase Realtime Database with the current backend data.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the data is successfully pushed.
 */
async function syncBackendDataWithFirebase() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(backendData),
  });
  window.location.reload();
}

/**
 * Saves the given task into the global backendData.
 * Automatically assigns a unique task ID.
 *
 * @async
 * @param {Object} task - The task object to be saved.
 * @returns {Promise<void>} A promise that resolves when the task is stored.
 */
async function pushTaskToBackendData(task) {
  await fetchDataJSON();

  if (!backendData.Data.Tasks) {
    backendData.Data.Tasks = {};
  }

  let tasks = backendData.Data.Tasks;
  let taskKeys = Object.keys(tasks);
  let newTaskId = null;

  for (let i = 0; i < taskKeys.length; i++) {
    if (taskKeys[i] !== `taskId${i}`) {
      newTaskId = `taskId${i}`;
      break;
    }
  }

  if (newTaskId === null) {
    let nextId = taskKeys.length;
    newTaskId = `taskId${nextId}`;
  }
  backendData.Data.Tasks[newTaskId] = task;
}




