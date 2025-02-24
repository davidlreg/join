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
  document.querySelectorAll("#selectedContacts .profilePicture").forEach((el) => {
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
  return urlParams.get("boardSection");
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

  if (window.innerWidth <= 1000) {
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
  await showTaskCreatedMessage();
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
function getErrorTarget(inputElement) {
  if (inputElement.id === "selectTask") {
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

  const { addTaskTitle, addTaskDescription, addTaskDate, addTaskSubTasks } = getAddTaskElements();

  let subtasksArray = Array.from(addTaskSubTasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));
  const assignedContacts = getSelectedContacts();

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
    loadContacts(tasks[taskId].assignedTo);
  }
  loadTasksToBoard();
  initFlatpickr();
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

async function showTaskCreatedMessage() {
  return new Promise((resolve) => {
    const message = document.createElement('div');
    message.className = 'createdTaskContainer';
    message.innerHTML = `
      <div class="taskSuccessfullyCreated">
        <p>Task added to board</p>
        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.9544 5.75564L22.9545 26.21C22.9538 26.8125 22.7142 27.3903 22.2881 27.8163C21.862 28.2424 21.2843 28.4821 20.6817 28.4827L16.1363 28.4827C15.5338 28.4821 14.956 28.2424 14.53 27.8163C14.1039 27.3903 13.8642 26.8125 13.8636 26.21L13.8636 5.75564C13.8642 5.15306 14.1039 4.57534 14.53 4.14926C14.956 3.72317 15.5338 3.48353 16.1363 3.48293L20.6817 3.48293C21.2843 3.48353 21.862 3.72317 22.2881 4.14926C22.7142 4.57534 22.9538 5.15306 22.9544 5.75564ZM16.1363 26.21L20.6817 26.21L20.6817 5.75564L16.1363 5.75564L16.1363 26.21ZM16.1363 5.75564L16.1363 26.21C16.1357 26.8125 15.8961 27.3902 15.47 27.8163C15.0439 28.2424 14.4662 28.482 13.8636 28.4826L9.31823 28.4826C8.71566 28.482 8.13794 28.2424 7.71185 27.8163C7.28577 27.3902 7.04613 26.8125 7.04553 26.2099L7.04553 5.75561C7.04613 5.15304 7.28577 4.57532 7.71185 4.14923C8.13793 3.72315 8.71566 3.48351 9.31823 3.48291L13.8636 3.48291C14.4662 3.48351 15.0439 3.72315 15.47 4.14923C15.8961 4.57532 16.1357 5.15306 16.1363 5.75564ZM9.31823 26.2099L13.8636 26.21L13.8636 5.75564L9.31823 5.75561L9.31823 26.2099ZM9.31823 5.75561L9.31823 26.2099C9.31763 26.8125 9.07799 27.3902 8.65191 27.8163C8.22582 28.2424 7.6481 28.482 7.04553 28.4826L2.50012 28.4826C1.89755 28.482 1.31983 28.2424 0.893741 27.8163C0.467657 27.3902 0.228019 26.8125 0.227417 26.2099L0.227416 5.75561C0.228018 5.15304 0.467656 4.57532 0.89374 4.14923C1.31982 3.72315 1.89755 3.48351 2.50012 3.48291L7.04553 3.48291C7.6481 3.48351 8.22582 3.72315 8.6519 4.14923C9.07799 4.57532 9.31763 5.15304 9.31823 5.75561ZM2.50012 26.2099L7.04553 26.2099L7.04553 5.75561L2.50012 5.75561L2.50012 26.2099Z" fill="white"/>
          <path d="M29.7726 5.75589L29.7726 26.2102C29.772 26.8128 29.5323 27.3905 29.1062 27.8166C28.6802 28.2427 28.1024 28.4823 27.4999 28.4829L22.9545 28.4829C22.3519 28.4823 21.7742 28.2427 21.3481 27.8166C20.922 27.3905 20.6824 26.8125 20.6817 26.21L20.6817 5.75564C20.6823 5.15306 20.922 4.57559 21.3481 4.14951C21.7742 3.72342 22.3519 3.48379 22.9544 3.48318L27.4999 3.48318C28.1024 3.48379 28.6801 3.72342 29.1062 4.14951C29.5323 4.57559 29.772 5.15331 29.7726 5.75589ZM22.9545 26.21L27.4999 26.2102L27.4999 5.75589L22.9544 5.75564L22.9545 26.21Z" fill="white"/>
        </svg>
      </div>
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      message.classList.add('fade-out');
      setTimeout(() => {
        message.remove();
        resolve();
      }, 500);
    }, 3000);
  });
}


