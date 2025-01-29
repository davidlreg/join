function init() {
  setActiveLinkFromURL();
}

function getBoardElements() {
  return {
    tasksToDo: document.getElementById('buttonNoTasksToDo'),
    tasksInProgess: document.getElementById('buttonNoTasksInProgess'),
    tasksAwaiting: document.getElementById('buttonNoTasksAwaiting'),
    tasksDone: document.getElementById('buttonNoTasksDone'),
  };
}

function setTasksToDo() {
  const { tasksToDo } = getBoardElements();
  
}


function showTask() {
  const { tasksToDo, tasksInProgess, tasksAwaiting, tasksDone} = getBoardElements();

}

function updateSubtaskProgress(completed, total) {
  const progressBar = document.querySelector('.subtask-progress-bar');
  const percentage = (completed / total) * 100;
  progressBar.style.width = percentage + '%';
}

// Testaufruf mit 2 von 5 erledigten Subtasks
updateSubtaskProgress(2, 5);

