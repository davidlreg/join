function init() {
  setActiveLinkFromURL();
}

/**
 * 
 * Gets the text from the subtask input field. If the input is empty, it shows an alert.
 * If the input has text, it creates a new subtask and adds it to the list. Then, it clears the input field.
 */
function addSubtask() {
  const subtaskInput = document.getElementById('subtaskInput');
  const subtaskList = document.getElementById('subtaskList');
  const subtaskValue = subtaskInput.value.trim();

  if (subtaskValue === '') {
    alert('Subtask cannot be empty!');
    return;
  }

  const listItem = createSubtaskElement(subtaskValue);
  subtaskList.appendChild(listItem);

  subtaskInput.value = '';
}

/**
 * Creates a new subtask element to display in the list.
 *
 * @param {string} subtaskValue - The text or name of the subtask to be displayed.
 * @returns {HTMLElement} The newly created list item element that contains the subtask and a remove button.
 */
function createSubtaskElement(subtaskValue) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
      <span>${subtaskValue}</span>
      <span class="removeSubtask">Remove</span>
  `;
  listItem.querySelector('.removeSubtask').addEventListener('click', () => removeSubtask(listItem));
  return listItem;
}

/**
 * Removes a subtask from the list.
 *
 * @param {HTMLElement} listItem - The subtask element to be removed from the list.
 */
function removeSubtask(listItem){
  listItem.remove();
}