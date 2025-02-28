/**
 * Toggles the visibility of subtask-related icons based on the input field's value.
 *
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

/**
 * Displays or hides the subtask board based on the availability of subtasks.
 *
 */
function showSubtaskBoard() {
  const showSubtask = document.querySelector(
    `[data-task-id="${taskId}"] .boardSubTasks`
  );

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
 * Adds a new subtask if input is not empty, then clears the input field.
 *
 */
function addSubtask() {
  if (!subtaskEmpty()) return;

  const subtaskInput = document.getElementById("addTaskSubTasks");
  const subtaskList = document.getElementById("subtaskList");
  const subtaskValue = subtaskInput.value.trim();

  subtaskList.appendChild(createSubtaskElement(subtaskValue));
  subtaskInput.value = "";
  toggleSubtaskIcons();
}

/**
 * Validates if the subtask input field is empty and shows an error if so.
 *
 */
function subtaskEmpty() {
  const subtaskInput = document.getElementById("addTaskSubTasks");
  return validateSubtaskInput(subtaskInput);
}

/**
 * Validates if the subtask input field contains a value.
 *
 * @param {HTMLInputElement} subtaskInput - The subtask input field.
 * @returns {boolean} - Returns true if input is valid, false otherwise.
 */
function validateSubtaskInput(subtaskInput) {
  let isValid = true;
  clearSubtaskError(subtaskInput);

  if (!subtaskInput.value.trim()) {
    showSubtaskError(subtaskInput, "Subtask cannot be empty");
    isValid = false;
  }
  return isValid;
}

/**
 * Displays an error message below the subtask input field.
 *
 * @param {HTMLInputElement} inputElement - The input field with the error.
 * @param {string} message - The error message.
 */
function showSubtaskError(inputElement, message) {
  let targetElement = getSubtaskErrorTarget(inputElement);
  if (!targetElement) return;

  let existingError = targetElement.nextElementSibling;
  if (existingError && existingError.classList.contains("errorMessage")) {
    existingError.remove();
  }

  let errorMessage = document.createElement("span");
  errorMessage.classList.add("errorMessage");
  errorMessage.textContent = message;

  targetElement.insertAdjacentElement("afterend", errorMessage);
}

/**
 * Gets the correct element to show the error message next to.
 *
 * @param {HTMLInputElement} inputElement - The input field with the error.
 * @returns {HTMLElement} - The correct target element for the error message.
 */
function getSubtaskErrorTarget(inputElement) {
  if (!inputElement) return null;

  let subtaskContainer = inputElement.closest("[id^='subtask']");
  return subtaskContainer ? subtaskContainer : null;
}

/**
 * Clears any existing subtask error messages.
 *
 * @param {HTMLInputElement} inputElement - The input field.
 */
function clearSubtaskError(inputElement) {
  let targetElement = getSubtaskErrorTarget(inputElement);

  if (!targetElement) return;

  let existingError = targetElement.parentNode?.querySelector(".errorMessage");
  if (existingError) existingError.remove();
}

/**
 * Clears the subtask input field and updates UI icons.
 *
 */
function clearSubtaskInput() {
  const subtaskInput = document.getElementById("addTaskSubTasks");
  subtaskInput.value = "";
  toggleSubtaskIcons();
}

/**
 * Creates and returns a new subtask element.
 *
 * @param {string} subtaskValue - The subtask text.
 * @returns {HTMLElement} - The newly created subtask element.
 */
function createSubtaskElement(subtaskValue) {
  const listItem = document.createElement("li");
  listItem.classList.add("subtaskItem");
  listItem.innerHTML = getSubtasks(subtaskValue);

  listItem
    .querySelector(".editSubtask")
    .addEventListener("click", () => editSubtask(listItem, subtaskValue));
  listItem
    .querySelector(".removeSubtask")
    .addEventListener("click", () => removeSubtask(listItem));
  return listItem;
}

/**
 * Enables editing mode for a subtask.
 *
 * @param {HTMLElement} listItem - The subtask element.
 * @param {string} oldValue - The previous value of the subtask.
 */
function editSubtask(listItem, oldValue) {
  const subtaskContent = listItem.querySelector(".subtaskContent");
  subtaskContent.classList.add("editing");
  updateSubtaskTextWrapper(listItem, oldValue);
  updateSubtaskIcons(listItem);
}

/**
 * Updates the subtask text wrapper for editing.
 *
 * @param {HTMLElement} listItem - The subtask element.
 * @param {string} oldValue - The previous subtask value.
 */
function updateSubtaskTextWrapper(listItem, oldValue) {
  const subtaskTextWrapper = listItem.querySelector(".subtaskTextWrapper");

  subtaskTextWrapper.innerHTML = `
    <input type="text" class="editSubtaskInput" id="editSubtaskInput" value="${oldValue}">
  `;
}

/**
 * Updates subtask icons for editing mode.
 *
 * @param {HTMLElement} listItem - The subtask element.
 */
function updateSubtaskIcons(listItem) {
  const subtaskIcons = listItem.querySelector(".subtaskIcons");
  subtaskIcons.innerHTML = getSubtaskIcons();
  addSubtaskEventListeners(listItem);
}

/**
 * Adds event listeners to a subtask item.
 *
 * @param {HTMLElement} listItem - The subtask element.
 */
function addSubtaskEventListeners(listItem) {
  listItem
    .querySelector(".removeSubtask")
    .addEventListener("click", () => removeSubtask(listItem));
  listItem
    .querySelector(".confirmEditSubtask")
    .addEventListener("click", () => confirmSubtaskEdit(listItem));
}

/**
 * Confirms subtask edit and updates the item.
 *
 * @param {HTMLElement} listItem - The subtask element.
 */
function confirmSubtaskEdit(listItem) {
  const editInput = listItem.querySelector(".editSubtaskInput");
  if (!validateSubtaskInput(editInput)) return;
  finalizeSubtaskEdit(listItem, editInput.value.trim());
}

/**
 * Finalizes subtask editing by updating the element.
 *
 * @param {HTMLElement} listItem - The subtask element.
 * @param {string} newValue - The new subtask value.
 */
function finalizeSubtaskEdit(listItem, newValue) {
  listItem.querySelector(".subtaskContent").classList.remove("editing");
  listItem.replaceWith(createSubtaskElement(newValue));
}

/**
 * Removes a subtask from the list.
 *
 * @param {HTMLElement} listItem - The subtask element to remove.
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
document.addEventListener("dblclick", function (event) {
  const target = event.target.closest(".subtaskItem");
  if (target) {
    const oldValue = target.querySelector(".subtaskText")?.textContent || "";
    editSubtask(target, oldValue);
  }
});

/**
 * Enables editing mode for an existing subtask.
 *
 * @param {number} index - The index of the subtask to edit.
 */
function editOldSubtask(index) {
  const listItem = document.getElementById(`subtask${index + 1}`);
  const oldValue = listItem.querySelector(".subtaskText").innerHTML;
  listItem.classList.add("editing");

  updateOldSubtaskTextWrapper(listItem, oldValue);
  updateOldSubtaskIcons(listItem);
}

/**
 * Updates the text wrapper of a subtask for editing.
 *
 * @param {HTMLElement} listItem - The subtask element.
 * @param {string} oldValue - The previous subtask value.
 */
function updateOldSubtaskTextWrapper(listItem, oldValue) {
  const subtaskTextWrapper = listItem.querySelector(".editSubtaskTextWrapper");

  subtaskTextWrapper.innerHTML = `
    <input type="text" class="editSubtaskInput" id="editSubtaskInput" value="${oldValue}">
  `;
}

/**
 * Updates the icons of a subtask during editing mode.
 *
 * @param {HTMLElement} listItem - The subtask element.
 */
function updateOldSubtaskIcons(listItem) {
  const subtaskIcons = listItem.querySelector(".editSubtaskIcons");

  subtaskIcons.innerHTML = getSubtaskIcons();

  addOldSubtaskEventListeners(listItem);
}

/**
 * Adds event listeners for subtask actions (edit, remove).
 *
 * @param {HTMLElement} listItem - The subtask element.
 */
function addOldSubtaskEventListeners(listItem) {
  listItem
    .querySelector(".removeSubtask")
    .addEventListener("click", () => removeOldSubtask(listItem));

  listItem
    .querySelector(".confirmEditSubtask")
    .addEventListener("click", () => confirmOldSubtaskEdit(listItem));
}

/**
 * Validates and confirms the subtask edit.
 *
 * @param {HTMLElement} listItem - The subtask element.
 */
function confirmOldSubtaskEdit(listItem) {
  const editInput = listItem.querySelector(".editSubtaskInput");

  if (!validateSubtaskInput(editInput)) return;

  finalizeOldSubtaskEdit(listItem, editInput.value.trim());
}

/**
 * Finalizes the subtask edit by updating the element.
 *
 * @param {HTMLElement} listItem - The subtask element.
 * @param {string} newValue - The new subtask value.
 */
function finalizeOldSubtaskEdit(listItem, newValue) {
  listItem.classList.remove("editing");
  listItem.replaceWith(createSubtaskElement(newValue));
}

/**
 * Removes an existing subtask from the list.
 *
 * @param {number} index - The index of the subtask to remove.
 */
function removeOldSubtask(index) {
  const subtaskElement = document.getElementById(`subtask${index + 1}`);
  if (subtaskElement) {
    subtaskElement.remove();
  }
}
