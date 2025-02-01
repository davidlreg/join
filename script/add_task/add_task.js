function init() {
  setActiveLinkFromURL();
  headerUserName();
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
function removeSubtask(listItem) {
  listItem.remove();
}

/**
 * Toggles the visibility of the category dropdown.
 */
function toggleCategory() {
  const categoryDropdown = document.querySelector('.selectCategory');
  categoryDropdown.classList.toggle('show');
}

function selectCategory(category) {
  const selectContainer = document.getElementById('selectTask');
  const selectCategory = document.querySelector('.selectCategory');

  selectContainer.textContent = category;

 selectCategory.classList.remove('show');
}

/**
 * Toggles the visibility of all the contacts.
 */
function toggleContact() {
  const categoryDropdown = document.getElementById('selectContact');
  categoryDropdown.classList.toggle('show');
}

/**
 * Loads contact data from the Firebase database and displays it in the dropdown.
 */
async function loadContacts() {
  const data = await fetchContacts();
  if (data) populateContacts(data);
}

async function fetchContacts() {
  try {
    const response = await fetch ('https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json');
    const data = await response.json();
    return data.contacts || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return null; 
  }  
}