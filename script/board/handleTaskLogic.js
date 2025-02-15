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
    addTaskSubTasks: document.querySelectorAll("#subtaskList li span:first-child"),
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
 * Creates a new task and adds it to the board.
 *
 * @async
 */
async function createTasksForBoard() {
  const { addTaskTitle, addTaskDescription, addTaskDate, addTaskCategory, addTaskSubTasks, assignedContacts } = getAddTaskElements();

  if(!addTaskTitle.value.trim() || !addTaskDate.value.trim() || !addTaskCategory.value.trim()){
    alert("Please fill in all required fields before creating a task.");
    return;
  }
  
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

async function editTasksForBoard(taskId) {
  await fetchDataJSON();
  let tasks = backendData.Data.Tasks;

  const { addTaskTitle, addTaskDescription, addTaskDate, addTaskSubTasks, assignedContacts} = getAddTaskElements();

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

