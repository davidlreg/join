/**
 * Opens the overlay for adding a new contact, setting its content and event listeners.
 *
 */
function openAddContactOverlay() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showAddContactOverlay();
  addOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".addContactOverlay");
  openOverlay(overlay);
}

/**
 * Opens the mobile overlay for adding a new contact and applies the background styling.
 *
 */
function openAddContactOverlayMobile() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showAddContactOverlayMobile();
  addOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".addContactMobileWrapper");
  openOverlayMobile(overlay);
}

/**
 * Closes the add contact overlay and removes its content.
 *
 */
function closeAddContactOverlay() {
  const overlay = document.querySelector(".addContactOverlay");

  if (window.innerWidth > 1350) {
    closeOverlay(overlay);
  } else {
    closeAddContactOverlayMobile();
  }

  removeOverlayContent();
}

/**
 * Closes the add contact overlay on mobile and removes its content.
 *
 */
function closeAddContactOverlayMobile() {
  const overlay = document.querySelector(".addContactMobileWrapper");
  closeOverlayMobile(overlay);
  removeOverlayContent();
}

/**
 * Adds the overlay background class to the given container.
 *
 * @param {Element} container - The container to which the background class will be added.
 */
function addOverlayBackground(container) {
  container.classList.add("overlayBackground");
}

/**
 * Creates a new contact by retrieving user input from the form and saving it to the database.
 * After saving, it closes the overlay and shows a confirmation message.
 *
 * @returns {void}
 */
function createContact() {
  const isMobile = window.innerWidth <= 1350;
  const email = document.getElementById(isMobile ? "emailMobile" : "email").value;
  const name = document.getElementById(isMobile ? "nameMobile" : "name").value;
  const phone = document.getElementById(isMobile ? "phoneMobile" : "phone").value;

  if (checkFormValidity()) {
    return;
  }

  getNextId().then((nextContactId) => {
    saveContact(nextContactId, email, name, phone);
  });

  closeAddContactOverlay();

  setTimeout(() => {
    prepareData();
  }, 500);

  if (isMobile) {
    setTimeout(() => {
      showMobileContactCreatedMessage();
    }, 300);
  } else {
    showContactCreatedMessage();
  }
}

/**
 * Retrieves the next available contact ID from the database.
 *
 * @returns {Promise<number>} A promise that resolves to the next available contact ID.
 */
function getNextId() {
  return fetchContacts()
    .then(findNextId)
    .catch((error) => {
      console.error("Error fetching contacts:", error);
      return 1;
    });
}

/**
 * Fetches contacts from the database.
 *
 * @returns {Promise<Object>} A promise resolving to the contacts data.
 */
function fetchContacts() {
  const url = "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/Data/Contacts.json";
  return fetch(url).then((response) => response.json());
}

/**
 * Determines the next available contact ID from the contacts data.
 *
 * @param {Object} contacts - The contacts data.
 * @returns {number} The next available contact ID.
 */
function findNextId(contacts) {
  let nextContactId = 1;
  if (contacts) {
    nextContactId = findSmallestAvailableId(contacts);
  }
  return nextContactId;
}

/**
 * Finds the smallest available contact ID.
 *
 * @param {Object} contacts - The contacts data.
 * @returns {number} The smallest available contact ID.
 */
function findSmallestAvailableId(contacts) {
  const contactIds = Object.keys(contacts);
  const usedIds = new Set();

  contactIds.forEach((contactId) => {
    const idNumber = parseInt(contactId.replace("contactId", ""));
    if (!isNaN(idNumber)) {
      usedIds.add(idNumber);
    }
  });

  let nextContactId = 1;
  while (usedIds.has(nextContactId)) {
    nextContactId++;
  }

  return nextContactId;
}

/**
 * Saves a new contact to the database with the provided details.
 *
 * @param {number} contactId - The contact ID.
 * @param {string} email - The email address of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} phone - The phone number of the contact.
 * @returns {Promise<void>} A promise that resolves once the contact is saved.
 */
function saveContact(contactId, email, name, phone) {
  const url = `https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/Data/Contacts/contactId${contactId}.json`;

  const contactData = { email, name, phone };

  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Contact saved successfully:", data);
    })
    .catch((error) => {
      console.error("Error saving contact:", error);
    });
}

/**
 * Validates if the name is valid.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateName(name) {
  return /^[a-zA-Z\s]{2,}$/.test(name);
}

/**
 * Validates if the email is valid.
 *
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateEmail(email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
}

/**
 * Validates if the phone number is valid.
 *
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validatePhone(phone) {
  return /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/.test(phone);
}

/**
 * Checks if the form is valid and enables/disables the "Create Contact" button.
 *
 */
function checkFormValidity() {
  // Überprüfen, ob der Bildschirm kleiner als 1350px ist
  const isMobile = window.innerWidth <= 1350;

  // Wenn der Bildschirm kleiner als 1350px ist, benutze die mobilen Variablen
  const name = document.getElementById(isMobile ? "nameMobile" : "name").value.trim();
  const email = document.getElementById(isMobile ? "emailMobile" : "email").value.trim();
  const phone = document.getElementById(isMobile ? "phoneMobile" : "phone").value.trim();

  // Validierung der Felder
  const isValid = validateFields(name, email, phone);

  // Button aktivieren/deaktivieren
  toggleCreateButton(isValid);
}

/**
 * Validates all input fields and updates the error messages.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} phone - The user's phone number.
 * @returns {boolean} True if all fields are valid, otherwise false.
 */
function validateFields(name, email, phone) {
  const fieldPrefix = window.innerWidth > 1350 ? "" : "Mobile";
  const isNameValid = validateInput(`name${fieldPrefix}`, name, validateName, "Please enter a valid name.");
  const isEmailValid = validateInput(`email${fieldPrefix}`, email, validateEmail, "Please enter a valid email address.");
  const isPhoneValid = validateInput(`phone${fieldPrefix}`, phone, validatePhone, "Please enter a valid phone number.");
  return isNameValid && isEmailValid && isPhoneValid;
}

/**
 * Validates a single input field and updates its error message.
 *
 * @param {string} fieldId - The ID of the input field.
 * @param {string} value - The field's current value.
 * @param {Function} validator - The validation function.
 * @param {string} errorMessage - The error message to display.
 * @returns {boolean} True if the input is valid, otherwise false.
 */
function validateInput(fieldId, value, validator, errorMessage) {
  const inputField = document.getElementById(fieldId);
  const errorField = document.getElementById(`errorMsg${capitalize(fieldId)}`);

  if (!validator(value)) {
    inputField.style.border = "1px solid red";
    errorField.innerHTML = errorMessage;
    return false;
  }

  inputField.style.border = "";
  errorField.innerHTML = "";
  return true;
}

/**
 * Enables or disables the "Create Contact" button.
 *
 * @param {boolean} isValid - Whether the form is valid.
 */
function toggleCreateButton(isValid) {
  const button = document.getElementById("createContactBtn");
  button.disabled = !isValid;
  button.style.opacity = isValid ? "1" : "0.5";
  button.style.cursor = isValid ? "pointer" : "not-allowed";
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Renders and displays the contact creation confirmation message.
 *
 */
function showContactCreatedMessage() {
  const createdContactContainer = document.getElementById("createdContactContainer");
  createdContactContainer.innerHTML = showContactSucessfullyCreatedMessage();
  const overlay = createdContactContainer.querySelector(".contactSucessfullyCretaed");
  openOverlay(overlay);
  scheduleContactMessageClose(overlay);
}

/**
 * Displays a success message when a contact is created.
 * The message is animated into view and automatically disappears after a delay.
 */
function showMobileContactCreatedMessage() {
  const createdContactContainer = document.getElementById("showCreatedContactContainerMobile");
  createdContactContainer.innerHTML = showContactSucessfullyCreatedMessage();
  const overlay = document.getElementById("contactSucessfullyCretaed");

  openOverlayMobile(overlay);
  scheduleContactMessageCloseMobile(overlay);
}

/**
 * Animates the success message into view from the bottom.
 *
 * @param {HTMLElement} overlay - The message element.
 */
function openOverlayMobile(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateY(100%)";
  setTimeout(() => (overlay.style.transform = "translateY(0)"), 100);
}

/**
 * Schedules the automatic closing of the confirmation message after a delay.
 *
 * @param {HTMLElement} overlay - The message element.
 */
function scheduleContactMessageCloseMobile(overlay) {
  setTimeout(() => {
    animateContactMessageCloseMobile(overlay);
  }, 1500);
}

/**
 * Animates the closing of the confirmation message by sliding it down.
 *
 * @param {HTMLElement} overlay - The message element.
 */
function animateContactMessageCloseMobile(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateY(500%)";
  removeContactMessageAfterAnimation(overlay);
}

/**
 * Schedules the automatic closing of the confirmation message.
 *
 * @param {HTMLElement} overlay - The message element.
 */
function scheduleContactMessageClose(overlay) {
  setTimeout(() => {
    animateContactMessageClose(overlay);
  }, 1500);
}

/**
 * Animates the closing of the confirmation message.
 *
 * @param {HTMLElement} overlay - The message element.
 */
function animateContactMessageClose(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(500%)";
  removeContactMessageAfterAnimation(overlay);
}

/**
 * Removes the confirmation message from the DOM after the animation.
 *
 * @param {HTMLElement} overlay - The message element.
 */
function removeContactMessageAfterAnimation(overlay) {
  setTimeout(() => {
    if (overlay) {
      overlay.remove();
    }
  }, 300);
}

/**
 * Generates the HTML markup for the contact successfully created message.
 *
 * @returns {string} HTML markup for the success message.
 */

function showContactSucessfullyCreatedMessage() {
  return `
    <div class="contactSucessfullyCretaed" id="contactSucessfullyCretaed">
      <p>Contact successfully created</p>
    </div>
  `;
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("input", checkFormValidity);
});
