let datePicker;

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
  const selectContainer = document.getElementById("selectTask");
  selectContainer.value = category;
  toggleCategory();
}

/**
 * Selects a task category from the overlay.
 *
 * @param {string} category - The selected category.
 */
function selectCategoryOverlay(category) {
  const selectContainer = document.getElementById("selectTask");
  selectContainer.value = category;
  toggleCategory();
}

/**
 * Toggles the visibility of the contact dropdown.
 *
 */
function toggleContact() {
  const categoryDropdown = document.getElementById("selectContact");
  categoryDropdown.classList.toggle("show");
}

/**
 * Closes the dropdown menu if the click occurs outside of it.
 *
 * @param {Event} event - The click event.
 */
function closeDropdown(event) {
  const selectContact = document.getElementById("selectContact");
  const dropdown = document.getElementById("dropdown");

  if (
    dropdown &&
    selectContact &&
    !dropdown.contains(event.target) &&
    !selectContact.contains(event.target)
  ) {
    selectContact.classList.remove("show");
  }
}

/**
 * Loads contacts and populates the dropdown.
 *
 * @param {Array} [assignedTo=[]] - List of assigned contacts.
 */
async function loadContacts(assignedContacts = []) {
  const data = await fetchContacts();
  if (!data) return;

  const contactContainer = document.getElementById("selectContact");
  contactContainer.innerHTML = "";

  const contactList = Object.values(data);
  contactList.forEach((contact) => {
    const contactItem = createContentItem(contact);

    if (assignedContacts.some((assigned) => assigned.name === contact.name)) {
      contactItem.classList.add("selected");
      const checkBox = contactItem.querySelector(".contactCheckbox");
      checkBox.checked = true;
    }

    contactContainer.appendChild(contactItem);
  });
}

/**
 * Fetches contact data from Firebase.
 *
 * @returns {Promise<Array>} A promise resolving to an array of contacts.
 */
async function fetchContacts() {
  try {
    const response = await fetch(
      "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json"
    );
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
  const contactContainer = document.getElementById("selectContact");
  const contactItem = createContentItem(contact, assignedTo);
  contactContainer.appendChild(contactItem);
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

  const profilePicture = createProfilePicture(contact);
  const contactName = createContactName(contact.name);
  const checkBox = createCheckbox(contact.name, assignedTo);

  contactItem.appendChild(profilePicture);
  contactItem.appendChild(contactName);
  contactItem.appendChild(checkBox);

  addContactClick(contactItem, checkBox);
  return contactItem;
}

/**
 * Adds a click event to a contact item, allowing selection by clicking the container or checkbox.
 *
 * @param {HTMLElement} contactItem - The container element for the contact.
 * @param {HTMLInputElement} checkBox - The checkbox inside the contact item.
 */
function addContactClick(contactItem, checkBox) {
  contactItem.addEventListener("click", function (event) {
    if (event.target === checkBox) {
      contactItem.classList.toggle("selected");
      updateSelectedContact();
      return;
    }

    this.classList.toggle("selected");
    checkBox.checked = !checkBox.checked;
    updateSelectedContact();
  });

  checkBox.addEventListener("click", function (event) {
    event.stopPropagation();
    contactItem.classList.toggle("selected");
    updateSelectedContact();
  });
}

/**
 * Creates a placeholder for the profile image.
 *
 * @returns {HTMLElement} A div element styled as a profile placeholder.
 */
function createProfilePicture(contact) {
  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profilePicture");
  profileDiv.setAttribute("title", contact.name);
  profileDiv.style.backgroundColor = getRandomColorForName(contact.name);
  profileDiv.textContent = `${contact.name.charAt(0).toUpperCase()}${
    contact.name.split(" ")[1]?.charAt(0).toUpperCase() || ""
  }`;

  return profileDiv;
}

/**
 * Creates a span element containing the contact's name.
 *
 * @param {string} name - The name of the contact.
 * @returns {HTMLElement} A span element displaying the contact's name.
 */
function createContactName(name) {
  const contactName = document.createElement("b");
  contactName.textContent = name;
  contactName.classList.add("contactName");
  return contactName;
}

/**
 * Creates a checkbox for selecting the contact.
 *
 * @param {string} name - The name of the contact, used as the checkbox value.
 * @returns {HTMLElement} An input element of type "checkbox".
 */
function createCheckbox(name, assignedTo = []) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("contactCheckbox");
  checkbox.value = name;

  if (assignedTo.some((contact) => contact.name === name)) {
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", updateSelectedContact);
  return checkbox;
}

/**
 * Updates the display of selected contacts under the dropdown
 * without resetting previously selected contacts.
 *
 */
function updateSelectedContact() {
  const selectedContactsContainer = document.getElementById("selectedContacts");
  selectedContactsContainer.innerHTML = "";

  const newSelectedNames = Array.from(
    document.querySelectorAll(".contactCheckbox:checked")
  ).map((checkbox) => checkbox.value);

  fullAssignedContacts = newSelectedNames;

  displayContacts = fullAssignedContacts.slice(0, 4);

  const contactProfiles = createSelectedProfilePictures(displayContacts);
  contactProfiles.forEach((profile) =>
    selectedContactsContainer.appendChild(profile)
  );

  if (fullAssignedContacts.length > 4) {
    const moreContacts = document.createElement("div");
    moreContacts.classList.add("profilePicture", "moreContactsIndicator");
    moreContacts.textContent = `+${fullAssignedContacts.length - 4}`;
    selectedContactsContainer.appendChild(moreContacts);
  }
}

/**
 * Creates profile picture elements for selected contacts in Task.
 *
 *
 * @param {string[]} selectedNames - Array of contact names with checked checkboxes.
 * @returns {HTMLDivElement[]} An array of div elements representing profile pictures.
 */
function createSelectedProfilePictures(selectedNames) {
  return selectedNames.map((name) => {
    const profileDiv = document.createElement("div");
    profileDiv.classList.add("profilePicture");
    profileDiv.setAttribute("title", name);
    profileDiv.style.backgroundColor = getRandomColorForName(name);
    profileDiv.textContent = `${name.charAt(0).toUpperCase()}${
      name.split(" ")[1]?.charAt(0).toUpperCase() || ""
    }`;

    return profileDiv;
  });
}

/**
 * Returns today's date at 00:00.
 *
 * @returns {Date} - Today's date without time.
 */
function getToday() {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Past days were decleared with a gray background-color.
 *
 * @param {HTMLElement} dayElem - HTML-Element of the day.
 */
function stylePastDays(dayElem) {
  let today = getToday();
  let date = new Date(dayElem.dateObj);

  if (date < today) {
    dayElem.style.background = "lightgray";
    dayElem.style.color = "darkgray";
    dayElem.classList.add("past-day");
  }
}

/**
 * Initializes Flatpickr for a single input field.
 *
 * @param {HTMLInputElement} inputElement - Input-Element for the datePicker.
 */
function setupFlatpickr(inputElement) {
  flatpickr(inputElement, {
    dateFormat: "d/m/Y",
    allowInput: false,
    disableMobile: true,
    clickOpens: true,
    position: "below",
    static: true,
    positionElement: inputElement,
    appendTo: document.body,
    onDayCreate: (dObj, dStr, fp, dayElem) => stylePastDays(dayElem),
  });
}

/**
 * Searches for all datepicker input fields with the ID “addTaskDate” and initializes Flatpickr for each of them.
 *
 */
function initFlatpickr() {
  document.querySelectorAll("#addTaskDate").forEach(setupFlatpickr);
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
  [
    "addTaskTitle",
    "addTaskDescription",
    "addTaskDate",
    "selectTask",
    "addTaskSubTasks",
  ].forEach((id) => {
    document.getElementById(id).value = "";
  });
  ["selectedContacts", "subtaskList"].forEach((id) => {
    document.getElementById(id).textContent = "";
  });
  document
    .querySelectorAll(".contactCheckbox")
    .forEach((checkbox) => (checkbox.checked = false));
  document
    .querySelectorAll(".selectContactItem")
    .forEach((contact) => contact.classList.remove("selected"));
  document.getElementById("subtaskPlusIcon").style.display = "inline";
  document.getElementById("subtaskIcons").style.display = "none";
  resetButtonsOverlay();
  let mediumButton = document.getElementById("mediumButton");
  mediumButton.classList.add("medium");
  mediumButton.querySelector(
    "img"
  ).src = `/assets/icon/addTask/medium_white.png`;
  clearErrorForField("errorMessageAddTaskTitle");
  clearErrorForField("errorMessageAddTaskDueDate");
  clearErrorForField("errorMessageAddTaskCategory");
}

/**
 * Adds input event listeners to clear errors on input.
 *
 */
function addInputListeners() {
  const titleInput = document.getElementById("addTaskTitle");
  const dateInput = document.getElementById("addTaskDate");
  const categorySelect = document.getElementById("selectTask");

  titleInput.addEventListener(
    "input",
    clearErrorForField.bind(null, "errorMessageAddTaskTitle")
  );
  dateInput.addEventListener(
    "input",
    clearErrorForField.bind(null, "errorMessageAddTaskDueDate")
  );
  categorySelect.addEventListener(
    "change",
    clearErrorForField.bind(null, "errorMessageAddTaskCategory")
  );
}

/**
 * Clears an error message by its ID.
 *
 * @param {string} errorId - The ID of the error message element.
 */
function clearErrorForField(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
}

document.addEventListener("click", closeDropdown);
