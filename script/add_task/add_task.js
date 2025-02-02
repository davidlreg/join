function initTask() {
  loadContacts();
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

/**
 * Fetches contact data from a Firebase database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of contact objects if available, or an empty array if no contacts are found.
 */
async function fetchContacts() {
  try {
    const response = await fetch ('https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json');
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
function populateContacts(contacts){
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
 * Adds a contact to the dropdown list.
 *
 * @param {Object} contact - The contact object containing the name.
 */
function addContactToDropdown(contact){
  const contactContainer = document.getElementById('selectContact');
  const contactItem = document.createElement('div');
  contactItem.classList = 'selectContactItem';
  contactItem.textContent = contact.name;
  contactItem.onclick = () => selectContact(contact.name);
  contactContainer.appendChild(contactItem);
}