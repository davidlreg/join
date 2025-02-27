/**
 * Initializes the task management system.
 *
 */
function initTask() {
  setActiveLinkFromURL();
  loadContacts();
  headerUserName();
  setPriority("medium");
  initFlatpickr();
  addInputListeners();
}

/**
 * Selects a task category.
 *
 * @param {string} category - The selected category.
 */
function selectCategory(category) {
  document.getElementById("selectTask").value = category;
  toggleCategory();
}

/**
 * Selects a task category from the overlay.
 *
 * @param {string} category - The selected category.
 */
function selectCategoryOverlay(category) {
  document.getElementById("selectTask").value = category;
  toggleCategory();
}

/**
 * Toggles the visibility of the contact dropdown.
 *
 */
function toggleContact() {
  document.getElementById("selectContact").classList.toggle("show");
}

/**
 * Closes the dropdown menu if the click occurs outside of it.
 * @param {Event} event - The click event.
 */
function closeDropdown(event) {
  const selectContact = document.getElementById("selectContact");
  const dropdown = document.getElementById("dropdown");

  if (!selectContact || !dropdown) return;

  if (!dropdown.contains(event.target) && !selectContact.contains(event.target)) {
    selectContact.classList.remove("show");
  }
}

/**
 * Loads contacts and populates the dropdown.
 *
 * @param {Array} [assignedTo=[]] - List of assigned contacts.
 */
async function loadContacts(assignedTo = []) {
  const data = await fetchContacts();
  if (data) populateContacts(data, assignedTo);
}

/**
 * Fetches contact data from Firebase.
 *
 * @returns {Promise<Array>} A promise resolving to an array of contacts.
 */
async function fetchContacts() {
  try {
    const response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
    const data = await response.json();
    return data.Data.Contacts || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

/**
 * Populates the contact dropdown.
 *
 * @param {Object} contacts - Contact data object.
 * @param {Array} [assignedTo=[]] - Assigned contacts.
 */
function populateContacts(contacts, assignedTo = []) {
  const contactContainer = document.getElementById("selectContact");
  contactContainer.innerHTML = "";
  const contactList = Object.values(contacts);
  if (contactList.length === 0) {
    contactContainer.innerHTML = `<p>No contacts found</p>`;
    return;
  }
  contactList.forEach((contact) => addContactToDropdown(contact, assignedTo));
}

/**
 * Adds a contact to the dropdown.
 *
 * @param {Object} contact - The contact object.
 * @param {Array} [assignedTo=[]] - Assigned contacts.
 */
function addContactToDropdown(contact, assignedTo = []) {
  document.getElementById("selectContact").appendChild(createContentItem(contact, assignedTo));
}

/**
 * Creates a contact item element.
 *
 * @param {Object} contact - The contact object.
 * @param {Array} [assignedTo=[]] - Assigned contacts.
 * @returns {HTMLElement} Contact item element.
 */
function createContentItem(contact, assignedTo = []) {
  const contactItem = document.createElement("div");
  contactItem.classList.add("selectContactItem");

  contactItem.appendChild(createProfilePicture(contact));
  contactItem.appendChild(createContactName(contact.name));
  contactItem.appendChild(createCheckbox(contact.name, assignedTo));

  addContactClick(contactItem, contactItem.lastChild);
  return contactItem;
}

/**
 * Opens the date picker if available.
 *
 */
function openDatePicker() {
  if (datePicker) datePicker.open();
}

/**
 * Clears the task creation form.
 *
 */
function clearButton() {
  ["addTaskTitle", "addTaskDescription", "addTaskDate", "selectTask", "addTaskSubTasks"].forEach((id) => {
    document.getElementById(id).value = "";
  });
  ["selectedContacts", "subtaskList"].forEach((id) => {
    document.getElementById(id).textContent = "";
  });
  document.querySelectorAll(".contactCheckbox").forEach((checkbox) => (checkbox.checked = false));
  document.querySelectorAll(".selectContactItem").forEach((contact) => contact.classList.remove("selected"));
  document.getElementById("subtaskPlusIcon").style.display = "inline";
  document.getElementById("subtaskIcons").style.display = "none";
  resetButtonsOverlay();
  let mediumButton = document.getElementById("mediumButton");
  mediumButton.classList.add("medium");
  mediumButton.querySelector("img").src = `/assets/icon/addTask/medium_white.png`;
  clearErrorForField("errorMessageAddTaskTitle");
  clearErrorForField("errorMessageAddTaskDueDate");
  clearErrorForField("errorMessageAddTaskCategory");
}

/**
 * Adds input event listeners to clear errors on input.
 *
 */
function addInputListeners() {
  document.getElementById("addTaskTitle").addEventListener("input", () => clearErrorForField("errorMessageAddTaskTitle"));
  document.getElementById("addTaskDate").addEventListener("input", () => clearErrorForField("errorMessageAddTaskDueDate"));
  document.getElementById("selectTask").addEventListener("change", () => clearErrorForField("errorMessageAddTaskCategory"));
}

/**
 * Clears an error message by its ID.
 *
 * @param {string} errorId - The ID of the error message element.
 */
function clearErrorForField(errorId) {
  document.getElementById(errorId).textContent = "";
}

document.addEventListener("click", closeDropdown);
