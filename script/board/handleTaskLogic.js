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
  return Array.from(document.querySelectorAll(".contactCheckbox:checked")).map((checkbox) => ({
    name: checkbox.value,
  }));
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
    isValid = showError("errorMessageAddTaskTitle", "This field is required") && false;
  }

  if (!date.value.trim()) {
    isValid = showError("errorMessageAddTaskDueDate", "This field is required") && false;
  }

  if (!category.value.trim()) {
    isValid = showError("errorMessageAddTaskCategory", "This field is required") && false;
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
  const errorElementDueDate = document.getElementById("errorMessageAddTaskDueDate");
  const errorElementCategory = document.getElementById("errorMessageAddTaskCategory");

  errorElementTitle.innerHTML = "";
  errorElementDueDate.innerHTML = "";
  errorElementCategory.innerHTML = "";
}

/**
 * Creates a task object.
 *
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
 * Creates and adds a task to the board.
 *
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
 * Edits a task on the board.
 *
 */
async function editTasksForBoard(taskId) {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const elements = getAddTaskElements();
  const subtasksArray = Array.from(elements.addTaskSubTasks).map((subtask) => ({
    text: subtask.textContent,
    completed: false,
  }));
  tasks[taskId] = {
    ...tasks[taskId],
    assignedTo: getSelectedContacts(),
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
 * Deletes a task.
 *
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

/*
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
 * Syncs backend data with Firebase.
 *
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
    message.innerHTML = `

    <div class="taskSuccessfullyCreated">
 <p>Task added to board</p>
 <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path
     d="M20 1.99979L20 19.9998C19.9995 20.5301 19.7886 21.0385 19.4136 21.4134C19.0387 21.7884 18.5303 21.9993 18 21.9998L14 21.9998C13.4697 21.9993 12.9613 21.7884 12.5864 21.4134C12.2114 21.0385 12.0005 20.5301 12 19.9998L12 1.99979C12.0005 1.46952 12.2114 0.961118 12.5864 0.58616C12.9613 0.211202 13.4697 0.000317938 14 -0.000212328L18 -0.000212503C18.5303 0.000317717 19.0387 0.211202 19.4136 0.58616C19.7886 0.961118 19.9995 1.46952 20 1.99979ZM14 19.9998L18 19.9998L18 1.99979L14 1.99979L14 19.9998ZM14 1.99979L14 19.9998C13.9995 20.5301 13.7886 21.0384 13.4136 21.4134C13.0387 21.7883 12.5303 21.9992 12 21.9998L8 21.9998C7.46973 21.9992 6.96133 21.7883 6.58637 21.4134C6.21141 21.0384 6.00053 20.53 6 19.9998L6 1.99977C6.00053 1.4695 6.21141 0.961097 6.58637 0.586139C6.96133 0.211181 7.46973 0.000299127 8 -0.000231139L12 -0.000231314C12.5303 0.000298906 13.0387 0.211181 13.4136 0.586139C13.7886 0.961097 13.9995 1.46952 14 1.99979ZM8 19.9998L12 19.9998L12 1.99979L8 1.99977L8 19.9998ZM8 1.99977L8 19.9998C7.99947 20.53 7.78859 21.0384 7.41363 21.4134C7.03867 21.7883 6.53027 21.9992 6 21.9998L2 21.9998C1.46973 21.9992 0.961329 21.7883 0.586371 21.4134C0.211413 21.0384 0.000529412 20.53 -8.74331e-08 19.9998L-8.74238e-07 1.99977C0.000528579 1.4695 0.211412 0.961098 0.58637 0.58614C0.961328 0.211182 1.46973 0.000299389 2 -0.000230877L6 -0.000231051C6.53027 0.000299168 7.03867 0.211181 7.41363 0.586139C7.78859 0.961097 7.99947 1.4695 8 1.99977ZM2 19.9998L6 19.9998L6 1.99977L2 1.99977L2 19.9998Z"
     fill="white"
   />
   <path
     d="M26 2.00001L26 20C25.9995 20.5303 25.7886 21.0387 25.4136 21.4136C25.0387 21.7886 24.5303 21.9995 24 22L20 22C19.4697 21.9995 18.9613 21.7886 18.5864 21.4136C18.2114 21.0387 18.0005 20.5301 18 19.9998L18 1.99979C18.0005 1.46952 18.2114 0.961339 18.5864 0.586381C18.9613 0.211423 19.4697 0.000540836 20 1.05699e-05L24 1.0395e-05C24.5303 0.000540615 25.0387 0.211423 25.4136 0.586381C25.7886 0.961339 25.9995 1.46974 26 2.00001ZM20 19.9998L24 20L24 2.00001L20 1.99979L20 19.9998Z"
     fill="white"
   />
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
