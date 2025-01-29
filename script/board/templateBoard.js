function templateBoardTasks {
  return `
      <button class="boardTasks" id="buttonNoTasksToDo" onclick="showTask()">
        <p class="boardTaskCategory">User Story</p>
        <p class="boardTaskTitle">Kochwelt Page & Recipe Recommender</p>
        <p class="boardTaskDescription">Build start page with recipe recommendation</p>
        <div class="boardSubTasks">
          <div class="boardSubtaskProgress">
            <div class="boardSubtaskProgressBar"></div>        
          </div>
          <span>1/2 Subtasks</span>
        </div>
        <div class="boardTaskBottom">
          <div class="boardTaskUsers">Users</div>
          <div class="boardTaskPriority">Priority</div>
          </div>
      </button>
  `
}