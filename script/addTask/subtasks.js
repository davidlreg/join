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


  subtaskList.appendChild(createSubtaskElement(subtaskValue));
  subtaskInput.value = "";

  toggleSubtaskIcons();
}

/**
 * Checks if the subtask input is empty.
 * If empty, shows an error message.
 * 
 * @param {HTMLInputElement} subtaskInput - The input field where the user types a subtask.
 */
function subtaskEmpty() {
  const subtaskInput = document.getElementById('addTaskSubTasks');
  if (!validateSubtaskInput(subtaskInput)) return;
}

/**
 * Checks if the subtask input is empty.
 * If empty, shows an error message.
 * 
 * @param {HTMLInputElement} subtaskInput - The input field where the user types a subtask.
 * @returns {boolean} - `true` if the input is valid, `false` if empty.
 */
function validateSubtaskInput(subtaskInput) {
  let isValid = true;

  clearSubtaskError(subtaskInput)

  if (!subtaskInput.value.trim()) {
    showSubtaskError(subtaskInput, "Subtask cannot be empty");
    isValid = false;
  }

  return isValid;
}

/**
 * Shows an error message below the subtask input field.
 * 
 * @param {HTMLInputElement} inputElement - The input field with the error.
 * @param {string} message - The text to show as an error message.
 */
function showSubtaskError(inputElement, message) {
  let targetElement = getSubtaskErrorTarget(inputElement);

  let errorMessage = document.createElement("span");
  errorMessage.classList.add("errorMessage");
  errorMessage.textContent = message;

  targetElement.insertAdjacentElement("afterend", errorMessage);

  setTimeout(() => {
    clearSubtaskError(inputElement);
  }, 3000);
}


/**
 * Finds the correct place to show the error message.
 * 
 * @param {HTMLInputElement} inputElement - The input field with the error.
 * @returns {HTMLElement} - The container where the error should be shown.
 */
function getSubtaskErrorTarget(inputElement) {
  if(inputElement.id === "editSubtaskInput") {
    return inputElement.closest(".subtaskItem");
  }

  return inputElement.closest(".subtaskWrapper");
}

/**
 * Removes the error message from the subtask input field.
 * 
 * @param {HTMLInputElement} inputElement - The input field where the error was shown.
 */
function clearSubtaskError(inputElement) {
  let targetElement = getSubtaskErrorTarget(inputElement);

  let existingError = targetElement.parentNode.querySelector(".errorMessage");
  if (existingError) existingError.remove(); 
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
    <input type="text" class="editSubtaskInput" id="editSubtaskInput" value="${oldValue}">
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
  const editInput = listItem.querySelector('.editSubtaskInput');

  if (!validateSubtaskInput(editInput)) return;

  finalizeSubtaskEdit(listItem, editInput.value.trim());
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

/**
 * Event listener for detecting double-clicks on elements with the class "subtaskItem".
 * When a double-click is detected, the "editSubtask" function is called.
 * 
 * @param {MouseEvent} event - The double-click event.
 */
document.addEventListener('dblclick', function (event) {
  const target = event.target.closest('.subtaskItem');
  if (target) {
    const oldValue = target.querySelector('.subtaskText')?.textContent || '';
    editSubtask(target, oldValue);
  }
});