
let backendData = {};
async function fetchDataJSON() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
  let responseJSON = await response.json();
  backendData = responseJSON;
}

async function init() {
  setActiveLinkFromURL();
  await loadData();
  headerUserName();
  loadTasksToBoard();
  loadLocalTasksToBoard();
}

async function loadData() {
  await fetchDataJSON();
}

/**
 * Loads all tasks from the backend and adds them to the board.
 * It checks the task status and puts each task in the right section (To do, In progress, etc.).
 */
async function loadTasksToBoard() {
  await fetchDataJSON();
  let tasks = backendData.Data.Tasks;

  const { boardSectionTasksToDo, boardSectionTasksInProgress, boardSectionTasksAwaiting, boardSectionTasksDone } = getBoardElements();

  Object.keys(tasks).forEach(taskId => {
    let task = tasks[taskId]; 
    let taskHtml = templateBoardTasks(task, taskId); 

    if (task.status === "To do") {
      setIdToCreateTasks(boardSectionTasksToDo, taskHtml)
    } else if (task.status === "In progress") {
      setIdToCreateTasks(boardSectionTasksInProgress, taskHtml)
    } else if (task.status === "Await Feedback") {
      setIdToCreateTasks(boardSectionTasksAwaiting, taskHtml)
    } else if (task.status === "Done") {
      setIdToCreateTasks(boardSectionTasksDone, taskHtml)
    }
  });
}

/**
 * Loads all saved tasks from localStorage and adds them to the board.
 * It checks the task status and puts each task in the right section (To do, In progress, etc.).
 */
function loadLocalTasksToBoard() {
  let localTasks = JSON.parse(localStorage.getItem('localTasks')) || [];

  const { boardSectionTasksToDo, boardSectionTasksInProgress, boardSectionTasksAwaiting, boardSectionTasksDone } = getBoardElements();

  localTasks.forEach((task) => {
    let taskHtml = templateBoardTasks(task);

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
}

/**
 * get all Board Elements 
 * 
 * 
 */

function getBoardElements() {
  return {
    boardOverlay: document.getElementById('addBoardOverlay'),
    overlayBoardContent: document.getElementById('overlayBoardContent'),
    boardSectionTasksToDo: document.getElementById('boardNoTasksToDo'),
    boardSectionTasksInProgress: document.getElementById('boardNoTasksInProgress'),
    boardSectionTasksAwaiting: document.getElementById('boardNoTasksAwaiting'),
    boardSectionTasksDone: document.getElementById('boardNoTasksDone'),
  };
}

async function addBoardOverlay(taskId) {
  await fetchDataJSON();
  const { boardOverlay, overlayBoardContent } = getBoardElements();
  let tasks = backendData.Data.Tasks;

  let task = tasks[taskId];
  if (task) {
      let addBoardHtml = templateBoardOverlay(task);
      overlayBoardContent.innerHTML = addBoardHtml;
      boardOverlay.classList.remove('hideOverlay');
  }
}

function closeBoardOverlay(){
  let boardOverlay = document.getElementById('addBoardOverlay');
  boardOverlay.classList.add('hideOverlay');
}

// Diese Funktion muss noch implementiert werden. Hab sie nur als Vorlage mal geschrieben.
function updateSubtaskProgress(completed, total) {
  const progressBar = document.querySelector('.subtask-progress-bar');
  const percentage = (completed / total) * 100;
  progressBar.style.width = percentage + '%';
}

function setIdToCreateTasks(boardSectionId, taskHtml) {
  if (boardSectionId.classList.contains("boardButton")) {
    boardSectionId.classList.replace("boardButton", "boardTemplate");
    boardSectionId.textContent = "";
    boardSectionId.style.backgroundColor = "transparent";
  }

  boardSectionId.insertAdjacentHTML("beforeend", taskHtml);
}


////////////////////////////////////////////////
// Section to create a new task for the board //
////////////////////////////////////////////////


/**
 * get all task elements
 * 
 */

function getAddTaskElements() {
  return {
    addTaskTitle: document.getElementById('addTaskTitle'),
    addTaskDescription: document.getElementById('addTaskDescription'),
    addTaskDate: document.getElementById('addTaskDate'),
    addTaskSubTasks: document.getElementById('addTaskSubTasks'),
  };
}

/**
 * Create a new task with the add task forumlar 
 */
async function createTasksForBoard() {
  const { addTaskTitle, addTaskDescription, addTaskDate } = getAddTaskElements();

  let newTask = {
    assignedTo: "userId2",
    description: addTaskDescription.value,
    duedate: addTaskDate.value,
    priority: String(selectedPriority).charAt(0).toUpperCase() + String(selectedPriority).slice(1),
    status: selectedBoardSection,
    title: addTaskTitle.value,
  };
  await pushTaskToBackendData(newTask);
  await syncBackendDataWithFirebase();
}

/** 
 * Save the current Task into the global backandData
 */
async function pushTaskToBackendData(task) {
  await fetchDataJSON();
  let tasks = backendData.Data.Tasks;
  let taskKeys = Object.keys(tasks);
  let newTaskId = null;

  for (let i = 0; i < taskKeys.length; i++) {
    if (taskKeys[i] !== `taskId${i}`) {
      newTaskId = `taskId${i}`;
      break
    }
  }

  if (newTaskId === null) {
    let nextId = taskKeys.length;
    newTaskId = `taskId${nextId}`;
  }
  backendData.Data.Tasks[newTaskId] = task;
}

/** 
 * Push the global backendData into the Firebase
 */
async function syncBackendDataWithFirebase() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(backendData)
  });
}




