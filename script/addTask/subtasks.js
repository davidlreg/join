/**
 * Toggles the visibility of subtask-related icons based on the input field's value.
 * 
 * If the subtask input field contains text, the plus icon is hidden, 
 * and additional subtask icons are displayed.
 * 
 * If the input is empty, the plus icon is shown,
 * and the additional icons are hidden.
 */
function toggleSubtaskIcons() {
  const subtaskInput = document.getElementById("addTaskSubTasks");
  const subtaskPlusIcon = document.getElementById("subtaskPlusIcon");
  const subtaskIcons = document.getElementById("subtaskIcons");

  if (subtaskInput.value.trim() !== "") {
    subtaskPlusIcon.style.display = "none";
    subtaskIcons.style.display = "inline";
  } else {
    subtaskPlusIcon.style.display = "inline";
    subtaskIcons.style.display = "none";
  }
}

function showSubtaskBoard() {
  const showSubtask = document.querySelector(`[data-task-id="${taskId}"] .boardSubTasks`);

  if (showSubtask) {
    const task = backendData.Data.Tasks[taskId];
    if (!task.subtask || task.subtask.length === 0) {
      showSubtask.style.display = "none";
    } else {
      showSubtask.style.display = "inline";
    }
  }
}

/**
 * Gets the text from the subtask input field.
 * 
 * If the input is empty, it shows an alert.
 * If the input has text, it creates a new subtask and adds it to the list. Then, it clears the input field.
 */
function addSubtask() {
  const subtaskInput = document.getElementById('addTaskSubTasks');
  const subtaskList = document.getElementById('subtaskList');
  const subtaskValue = subtaskInput.value.trim();

  if (subtaskValue === '') {
    alert('Subtask cannot be empty!');
    return;
  }

  subtaskList.appendChild(createSubtaskElement(subtaskValue));
  subtaskInput.value = "";

  toggleSubtaskIcons();
}

/**
 * Clears the value of the subtask input field and updates the subtask icons.
 * 
 * After clearing the input, it calls `toggleSubtaskIcons()` to update the UI accordingly.
 */
function clearSubtaskInput() {
  const subtaskInput = document.getElementById('addTaskSubTasks');
  subtaskInput.value = "";

  toggleSubtaskIcons();
}

/**
 * Creates a new subtask element to display in the list.
 *
 * @param {string} subtaskValue - The text or name of the subtask to be displayed.
 * @returns {HTMLElement} The newly created list item element that contains the subtask and a remove button.
 */
function createSubtaskElement(subtaskValue) {
  const listItem = document.createElement('li');
  listItem.classList.add('subtaskItem');
  listItem.innerHTML = getSubtasks(subtaskValue);

  listItem.querySelector('.editSubtask').addEventListener('click', () => editSubtask(listItem, subtaskValue));
  listItem.querySelector('.removeSubtask').addEventListener('click', () => removeSubtask(listItem));

  return listItem;
}

/**
 * Initiates the editing mode for a subtask.
 * 
 * @param {HTMLElement} listItem - The list item containing the subtask.
 * @param {string} oldValue - The current value of the subtask.
 */
function editSubtask(listItem, oldValue) {
  const subtaskContent = listItem.querySelector('.subtaskContent');
  subtaskContent.classList.add('editing');

  updateSubtaskTextWrapper(listItem, oldValue);
  updateSubtaskIcons(listItem);
}

/**
 * Updates the subtask text wrapper with an input field.
 * 
 * @param {HTMLElement} listItem - The list item containing the subtask.
 * @param {string} oldValue - The current value of the subtask.
 */
function updateSubtaskTextWrapper(listItem, oldValue) {
  const subtaskTextWrapper = listItem.querySelector('.subtaskTextWrapper');

  subtaskTextWrapper.innerHTML = `
    <input type="text" class="editSubtaskInput" value="${oldValue}">
  `;
}

/**
 * Updates the subtask icons with editing controls.
 * 
 * @param {HTMLElement} listItem - The list item containing the subtask.
 */
function updateSubtaskIcons(listItem) {
  const subtaskIcons = listItem.querySelector('.subtaskIcons');

  subtaskIcons.innerHTML = getSubtaskIcons();

  addSubtaskEventListeners(listItem);
}

/**
 * Adds event listeners for removing and confirming subtask edits.
 * 
 * @param {HTMLElement} listItem - The list item containing the subtask.
 */
function addSubtaskEventListeners(listItem) {
  listItem.querySelector('.removeSubtask')
    .addEventListener('click', () => removeSubtask(listItem));

  listItem.querySelector('.confirmEditSubtask')
    .addEventListener('click', () => confirmSubtaskEdit(listItem));
}

/**
 * Confirms the subtask edit and updates the list item.
 * 
 * @param {HTMLElement} listItem - The list item containing the subtask.
 */
function confirmSubtaskEdit(listItem) {
  const newValue = listItem.querySelector('.editSubtaskInput').value.trim();

  if (newValue === '') {
    alert('Subtask cannot be empty!');
    return;
  }

  finalizeSubtaskEdit(listItem, newValue);
}

/**
 * Finalizes the subtask edit by replacing the old element.
 * 
 * @param {HTMLElement} listItem - The list item containing the subtask.
 * @param {string} newValue - The new value of the subtask.
 */
function finalizeSubtaskEdit(listItem, newValue) {
  listItem.querySelector('.subtaskContent').classList.remove('editing');
  listItem.replaceWith(createSubtaskElement(newValue));
}

/**
 * Removes a subtask from the list.
 *
 * @param {HTMLElement} listItem - The subtask element to be removed from the list.
 */
function removeSubtask(listItem) {
  listItem.remove();
}