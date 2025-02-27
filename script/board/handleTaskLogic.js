/** Retrieves elements for task creation.
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

/** Retrieves selected contacts.
 *
 */
function getSelectedContacts() {
  return Array.from(document.querySelectorAll(".contactCheckbox:checked")).map((checkbox) => ({
    name: checkbox.value,
  }));
}

/** Retrieves checked contacts.
 *
 */
function getCheckedSelectedContacts() {
  return Array.from(document.querySelectorAll("#selectedContacts .profilePicture")).map((el) => el.getAttribute("title"));
}

/** Gets "boardSection" from URL.
 *
 */
function getBoardSectionFromURL() {
  return new URLSearchParams(window.location.search).get("boardSection");
}

/** Validates task inputs.
 *
 */
function validateTaskInputs(title, date, category) {
  clearError();
  let isValid = true;
  if (!title.value.trim()) isValid = showError("errorMessageAddTaskTitle", "This field is required") && false;
  if (!date.value.trim()) isValid = showError("errorMessageAddTaskDueDate", "This field is required") && false;
  if (!category.value.trim()) isValid = showError("errorMessageAddTaskCategory", "This field is required") && false;
  return isValid;
}

/** Displays an error message.
 *
 */
function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

/** Clears error messages. */
function clearError() {
  document.getElementById("errorMessageAddTaskTitle").innerHTML = "";
  document.getElementById("errorMessageAddTaskDueDate").innerHTML = "";
  document.getElementById("errorMessageAddTaskCategory").innerHTML = "";
}

/** Creates a task object.
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

/** Creates and adds a task to the board.
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

/** Edits a task on the board.
 *
 */
async function editTasksForBoard(taskId) {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const elements = getAddTaskElements();
  const subtasksArray = Array.from(elements.addTaskSubTasks).map((subtask) => ({ text: subtask.textContent, completed: false }));
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

/** Deletes a task.
 *
 */
async function deleteTask() {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const boardOverlayTaskTitle = document.querySelector(".boardOverlayTaskTitle");
  closeBoardOverlay();
  for (const taskId in tasks) if (tasks[taskId].title === boardOverlayTaskTitle.textContent) delete tasks[taskId];
  if (Object.keys(tasks).length === 0) backendData.Data.Tasks = {};
  await syncBackendDataWithFirebase();
  loadTasksToBoard();
  location.reload();
}

<<<<<<< HEAD
/** Syncs backend data with Firebase.
=======
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
>>>>>>> a4c7ae843e1fe5266354c30e6d6406a2bbe566f5
 *
 */
async function syncBackendDataWithFirebase() {
  await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backendData),
  });
}

/** Saves task to backend.
 *
 */
async function pushTaskToBackendData(task) {
  await fetchDataJSON();
  if (!backendData.Data.Tasks) backendData.Data.Tasks = {};
  backendData.Data.Tasks[`taskId${Object.keys(backendData.Data.Tasks).length}`] = task;
}

/** Displays task creation message.
 *
 */
async function showTaskCreatedMessage() {
  return new Promise((resolve) => {
    const message = document.createElement("div");
    message.className = "createdTaskContainer";
    message.innerHTML = '<div class="taskSuccessfullyCreated"><p>Task added to board</p></div>';
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
