function initTask() {
  loadContacts();
  headerUserName();
  setPriority('medium');
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

/**
 * Fetches contact data from a Firebase database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of contact objects if available, or an empty array if no contacts are found.
 */
async function fetchContacts() {
  try {
    const response = await fetch('https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json');
    const data = await response.json();
    return data.Data.Contacts || [];

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

/**
 * Populates the contact dropdown with contact data.
 *
 * @param {Object} contacts - An object containing contact data, which is converted into an array
 *                            using Object.values() to ensure proper iteration and length checking.
 */
function populateContacts(contacts) {
  const contactContainer = document.getElementById('selectContact');
  contactContainer.innerHTML = '';

  const contactList = Object.values(contacts);

  if (contactList.length === 0) {
    contactContainer.innerHTML = `<p>No contacts found</p>`;
    return;
  }

  contactList.forEach(contact => addContactToDropdown(contact));
}


/**
 * Adds a contact item to the dropdown menu.
 *
 * @param {Object} contact - The contact object containing details (e.g., name, email, etc.).
 */
function addContactToDropdown(contact) {
  const contactContainer = document.getElementById('selectContact');
  const contactItem = createContentItem(contact);
  contactContainer.appendChild(contactItem);
}


/**
 * Creates a contact item with a profile placeholder, name, and checkbox.
 * 
 * @param {Object} contact - The contact object containing the name.
 * @returns {HTMLElement} A div element representing a contact.
 */

function createContentItem(contact) {
  const contactItem = document.createElement('div');
  contactItem.classList.add('selectContactItem');

  const profilePicture = createProfilePicture();
  const contactName = createContactName(contact.name);
  const checkBox = createCheckbox(contact.name);

  contactItem.appendChild(profilePicture);
  contactItem.appendChild(contactName);
  contactItem.appendChild(checkBox);

  return contactItem;
}

/**
 * Creates a placeholder for the profile image.
 * 
 * @returns {HTMLElement} A div element styled as a profile placeholder.
 */
function createProfilePicture() {
  const placeholder = document.createElement('div');
  placeholder.classList.add('profilePicture');
  return placeholder;
}


/**
 * Creates a span element containing the contact's name.
 * 
 * @param {string} name - The name of the contact.
 * @returns {HTMLElement} A span element displaying the contact's name.
 */
function createContactName(name) {
  const contactName = document.createElement('b');
  contactName.textContent = name;
  contactName.classList.add('contactName');
  return contactName;
}

/**
 * Creates a checkbox for selecting the contact.
 * 
 * @param {string} name - The name of the contact, used as the checkbox value.
 * @returns {HTMLElement} An input element of type "checkbox".
 */
function createCheckbox(name) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('contactCheckbox');
  checkbox.value = name;
  checkbox.addEventListener('change', updateSelectedContact);
  return checkbox;
}


/**
 * Updates the display of selected contacts under the dropdown.
 */
function updateSelectedContact() {
  const selectedContacts = document.getElementById('selectedContacts');
  selectedContacts.innerHTML = "";

  document.querySelectorAll('.contactCheckbox:checked').forEach(() => {
    const contactProfile = createProfilePicture();
    selectedContacts.appendChild(contactProfile);
  });
}

/**
 * Creates a new task, sets its default status to "To do," 
 * and stores it in localStorage.
 * 
 * @param {Object} task - The task object created from user input.
 */
function handleNewTask(){
  let task = createTask();
  task.status = "To do";
  addTaskLocal(task);
}

/**
 * Collects all task input data from the form.
 *
 * @returns {Object} An object containing the task details like title, description, due date, priority, category, selected contacts, and subtasks.
 */
function createTask() {
  const title = document.querySelector('.addTaskInput').value.trim();
  const description = document.querySelector('.addDescriptionInput').value.trim();
  const dueDate = document.querySelector('.addTaskInput[type="date"]').value;
  const priority = document.querySelector('.priorityButton .active')?.id || 'medium';
  const category = document.getElementById('selectTask').textContent.trim();

  const selectedContacts = [...document.querySelectorAll('.contactCheckbox:checked')].map(cb => cb.value);
  const subtasks = [...document.querySelectorAll('#subtaskList li span:first-child')].map(sub => sub.textContent);

  return formatTaskData(title, description, dueDate, priority, category, selectedContacts, subtasks);
}

/**
 * Formats the collected task data into an object.
 */
function formatTaskData(title, description, dueDate, priority, category, selectedContacts, subtasks) {
  return { title, description, dueDate, priority, category, selectedContacts, subtasks }

}

/**
 * Adds a new task to localStorage.
 * Converts existing tasks from a string to an array, 
 * appends the new task, and saves the updated list back as a string.
 * 
 * @param {Object} task - The task object to be stored.
 */
function addTaskLocal(task) {
  let localTasks = JSON.parse(localStorage.getItem('localTasks')) || [];    //in array
  localTasks.push(task);
  localStorage.setItem('localTasks', JSON.stringify(localTasks));
}









