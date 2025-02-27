let currentDraggedElement;
let currentTouchElement;

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
 * Sets the currently dragged task and applies a temporary shake effect.
 *
 * @param {DragEvent} event - The drag event.
 * @param {number} taskId - The ID of the task being dragged.
 */
function drag(event, taskId) {
  currentDraggedElement = taskId;
  event.dataTransfer.setData("taskId", taskId);
  const taskElement = document.getElementById(taskId);
  if (taskElement) {
    taskElement.classList.add("shake");
  }
  setTimeout(() => {
    taskElement.classList.remove("shake");
  }, 500);
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

/**
 * Checks if task containers are empty and updates their visibility accordingly.
 *
 */
function checkIfTaskExistInContainer() {
  const sections = [
    { containerId: "boardNoTasksToDo", sectionId: "tasksSectionToDo" },
    { containerId: "boardNoTasksInProgress", sectionId: "tasksSectionInProgress" },
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

/**
 * Highlights the element with the given ID by adding a CSS class.
 *
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
  document.getElementById(id).classList.add("dragAreaHighlight");
}

/**
 * Removes the highlight from the element with the given ID.
 *
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("dragAreaHighlight");
}

/**
 * Starts the touch interaction and sets the dragged task.
 *
 * @param {TouchEvent} event - The touch event.
 * @param {string} taskId - The ID of the task being dragged.
 */
function touchStart(event, taskId) {
  currentTouchElement = document.getElementById(taskId);
  currentDraggedElement = taskId;
  event.preventDefault();
}

/**
 * Moves the dragged task as the user moves their finger.
 *
 * @param {TouchEvent} event - The touch event.
 */
function touchMove(event) {
  let touch = event.touches[0];
  currentTouchElement.style.position = "absolute";
  currentTouchElement.style.left = `${touch.pageX - currentTouchElement.offsetWidth / 2}px`;
  currentTouchElement.style.top = `${touch.pageY - currentTouchElement.offsetHeight / 2}px`;
  event.preventDefault();
}

/**
 * Ends the touch interaction and places the task in the closest drop zone.
 *
 * @param {TouchEvent} event - The touch event.
 */
function touchEnd(event) {
  if (!currentTouchElement) return;
  let touch = event.changedTouches[0];
  let dropZones = {
    boardNoTasksToDo: "To do",
    boardNoTasksInProgress: "In progress",
    boardNoTasksAwaiting: "Await Feedback",
    boardNoTasksDone: "Done",
  };
  let dropZone = findDropZone(touch.clientX, touch.clientY, dropZones);
  if (dropZone) {
    moveTo(dropZones[dropZone.id], currentDraggedElement);
    dropZone.appendChild(currentTouchElement);
  }
  resetDraggedTask();
  event.preventDefault();
}

/**
 * Finds the nearest drop zone based on the touch coordinates.
 *
 * @param {number} x - The X position of the touch event.
 * @param {number} y - The Y position of the touch event.
 * @param {Object} dropZones - Drop zone mappings.
 * @returns {HTMLElement|null} - The closest drop zone or null.
 */
function findDropZone(x, y, dropZones) {
  let closestZone = null;
  let minDistance = Infinity;
  Object.keys(dropZones).forEach((id) => {
    let zone = document.getElementById(id);
    if (!zone) return;
    let rect = zone.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
    let distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    if (distance < minDistance) {
      minDistance = distance;
      closestZone = zone;
    }
  });
  return closestZone;
}

/**
 * Resets the position and variables of the dragged task after dropping.
 *
 */
function resetDraggedTask() {
  currentTouchElement.style.position = "";
  currentTouchElement.style.left = "";
  currentTouchElement.style.top = "";
  currentTouchElement = null;
  currentDraggedElement = null;
}
