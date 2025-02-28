let currentDraggedElement;
let currentTouchElement;
let touchTimer;

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
  await fetch(
    "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json",
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  );
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
 * Checks if the task container is empty and shows/hides the corresponding task section.
 *
 * @function
 */
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
    toggleTaskSection(section.containerId, section.sectionId);
  });
}

/**
 * Toggles the visibility of a task section based on whether its container has any children.
 *
 * @param {string} containerId - The ID of the task container.
 * @param {string} sectionId - The ID of the task section to toggle.
 * @function
 */
function toggleTaskSection(containerId, sectionId) {
  const container = document.getElementById(containerId);
  const taskSection = document.getElementById(sectionId);

  if (container.children.length === 0) {
    showSection(taskSection);
  } else {
    hideSection(taskSection);
  }
}

/**
 * Shows the given section by removing the 'dNone' class.
 *
 * @param {Element} taskSection - The task section element to show.
 * @function
 */
function showSection(taskSection) {
  taskSection.classList.remove("dNone");
}

/**
 * Hides the given section by adding the 'dNone' class.
 *
 * @param {Element} taskSection - The task section element to hide.
 * @function
 */
function hideSection(taskSection) {
  taskSection.classList.add("dNone");
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

  touchTimer = setTimeout(() => {
    currentTouchElement.classList.add("dragging");
  }, 100);

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
  currentTouchElement.style.left = `${
    touch.pageX - currentTouchElement.offsetWidth / 2
  }px`;
  currentTouchElement.style.top = `${
    touch.pageY - currentTouchElement.offsetHeight / 2
  }px`;
  event.preventDefault();
}

/**
 * Ends the touch interaction and places the task in the closest drop zone.
 *
 * @param {TouchEvent} event - The touch event.
 */
function touchEnd(event) {
  clearTimeout(touchTimer);

  if (!currentTouchElement.classList.contains("dragging")) {
    addBoardOverlay(currentDraggedElement);
  } else {
    let touch = event.changedTouches[0];
    let dropZones = getDropZones();
    let dropZone = findDropZone(touch.clientX, touch.clientY, dropZones);
    if (dropZone) {
      moveTo(dropZones[dropZone.id], currentDraggedElement);
      dropZone.appendChild(currentTouchElement);
    }
  }
  resetDraggedTask();
  event.preventDefault();
}

/**
 * Gives a list of drop zones and their task names.
 * Used to know where to place a task after touch.
 *
 * */
function getDropZones() {
  return {
    boardNoTasksToDo: "To do",
    boardNoTasksInProgress: "In progress",
    boardNoTasksAwaiting: "Await Feedback",
    boardNoTasksDone: "Done",
  };
}

/**
 * Finds the closest drop zone to a given point (x, y).
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {Object} dropZones - The drop zones with element IDs as keys.
 * @returns {HTMLElement|null} The closest drop zone element or null if none found.
 */
function findDropZone(x, y, dropZones) {
  let closestZone = null;
  let minDistance = Infinity;

  Object.keys(dropZones).forEach((id) => {
    let zone = document.getElementById(id);
    if (zone) {
      let distance = calculateDistance(x, y, zone);
      if (distance < minDistance) {
        minDistance = distance;
        closestZone = zone;
      }
    }
  });

  return closestZone;
}

/**
 * Calculates the distance between a point (x, y) and the center of a zone element.
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {HTMLElement} zone - The drop zone element.
 * @returns {number} The calculated distance.
 */
function calculateDistance(x, y, zone) {
  let rect = zone.getBoundingClientRect();
  let centerX = rect.left + rect.width / 2;
  let centerY = rect.top + rect.height / 2;

  return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
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
