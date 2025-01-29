function init() {
  setActiveLinkFromURL();
}

function getBoardElements() {
  return {
    boardSectionsSubContainer: document.querySelectorAll('.boardSectionsSubContainer'),
    boardTasks: document.querySelector('.boardTasks'),
    tasksToDo: document.getElementById('buttonNoTasksToDo'),
    tasksInProgess: document.getElementById('buttonNoTasksInProgess'),
    tasksAwaiting: document.getElementById('buttonNoTasksAwaiting'),
    tasksDone: document.getElementById('buttonNoTasksDone'),
  };
}

function addBoardOverlay() {
  let boardOverlay = document.getElementById('addBoardOverlay');
  let dynamicContent = document.getElementById('overlayBoardContent');

  let addBoardHtml = templateBoardOverlay();

  dynamicContent.innerHTML = addBoardHtml;

  boardOverlay.classList.remove('hideOverlay');
}

function closeBoardOverlay(){
  let boardOverlay = document.getElementById('addBoardOverlay');
  boardOverlay.classList.add('hideOverlay');
}


// function updateSubtaskProgress(completed, total) {
//   const progressBar = document.querySelector('.subtask-progress-bar');
//   const percentage = (completed / total) * 100;
//   progressBar.style.width = percentage + '%';
// }

// // Testaufruf mit 2 von 5 erledigten Subtasks
// updateSubtaskProgress(2, 5);