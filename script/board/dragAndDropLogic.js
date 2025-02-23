let currentDraggedElement;

/**
 * Moves a task to a new status and updates the backend.
 *
 * @param {string} newStatus - The new status for the task.
 * @param {number} taskId - The ID of the task to move.
 */
async function moveTo(newStatus, taskId) {
  removeHighlight("boardNoTasksToDo");
  removeHighlight("boardNoTasksInProgress");
  removeHighlight("boardNoTasksAwaiting");
  removeHighlight("boardNoTasksDone");
  updateTaskStatus(taskId, newStatus);
  await updateBackend(backendData);
  loadTasksToBoard();
  setTimeout(() => {
    checkIfTaskExistInContainer();
  }, 75);
}

/**
 * Updates the task status in the local data.
 *
 * @param {number} taskId - The ID of the task.
 * @param {string} newStatus - The new status to set.
 */
function updateTaskStatus(taskId, newStatus) {
  backendData.Data.Tasks[taskId].status = newStatus;
}

/**
 * Sends updated data to the backend.
 *
 * @param {Object} data - The updated data to send.
 */
async function updateBackend(data) {
  await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Allows an element to be dropped.
 *
 * @param {DragEvent} event - The drag event.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Sets the currently dragged task.
 *
 * @param {DragEvent} event - The drag event.
 * @param {number} taskId - The ID of the task being dragged.
 */
function drag(event, taskId) {
  currentDraggedElement = taskId;
  event.dataTransfer.setData("taskId", taskId);
}

/**
 * Handles the drop event and moves the task.
 *
 * @param {DragEvent} event - The drop event.
 * @param {string} newStatus - The new status for the dropped task.
 */
function drop(event, newStatus) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("taskId");
  moveTo(newStatus, taskId);
}

function checkIfTaskExistInContainer() {
  const sections = [
    { containerId: "boardNoTasksToDo", sectionId: "tasksSectionToDo" },
    {
      containerId: "boardNoTasksInProgress",
      sectionId: "tasksSectionInProgress",
    },
    { containerId: "boardNoTasksAwaiting", sectionId: "tasksSectionAwaiting" },
    { containerId: "boardNoTasksDone", sectionId: "tasksSectionDone" },
  ];

  sections.forEach((section) => {
    const container = document.getElementById(section.containerId);
    const taskSection = document.getElementById(section.sectionId);

    if (container.children.length == 0) {
      taskSection.classList.remove("dNone");
    } else {
      taskSection.classList.add("dNone");
    }
  });
}

function highlight(id) {
  document.getElementById(id).classList.add("dragAreaHighlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("dragAreaHighlight");
}

