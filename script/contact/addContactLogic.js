/**
 * Opens the overlay for adding a new contact, setting its content and event listeners.
 *
 */
function openAddContactOverlay() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showAddContactOverlay();
  addOverlayBackground(overlayContainer);
  const inputIds = ["name", "email", "phone"];
  const overlay = overlayContainer.querySelector(".addContactOverlay");
  inputIds.forEach((id) => {
    const inputElement = overlay.querySelector(`#${id}`);
    if (inputElement) {
      inputElement.addEventListener("blur", checkFormValidity);
    }
  });
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
  const inputIds = ["nameMobile", "emailMobile", "phoneMobile"];
  const overlay = overlayContainer.querySelector(".addContactMobileWrapper");
  inputIds.forEach((id) => {
    const inputElement = overlay.querySelector(`#${id}`);
    if (inputElement) {
      inputElement.addEventListener("blur", checkFormValidity);
    }
  });
  openOverlayMobile(overlay);
}

/**
 * Closes the add contact overlay and removes its content.
 *
 */
function closeAddContactOverlay() {
  const overlay = document.querySelector(".addContactOverlay");
  if (window.innerWidth > 1000) {
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
 * Creates a new contact if it does not already exist.
 * Retrieves user input, checks for duplicates, and saves the contact.
 * Displays an error message if the contact already exists.
 *
 */
async function createContact() {
  const isMobile = window.innerWidth <= 1000;
  const getValue = (id) => document.getElementById(isMobile ? id + "Mobile" : id).value;
  const [email, name, phone] = [getValue("email"), getValue("name"), getValue("phone")];

  if (checkFormValidity() || (await checkIfContactAlreadyExists(email, phone))) {
    document.getElementById(isMobile ? "errorMsgContactExistMobile" : "errorMsgContactExist").innerText = "This contact already exists.";
    return;
  }

  saveContact(await getNextId(), email, name, phone);
  closeAddContactOverlay();
  setTimeout(() => {
    prepareData();
    isMobile ? showMobileContactCreatedMessage() : showContactCreatedMessage();
  }, 500);
}

/**
 * Checks if a contact with the same email or phone number already exists.
 *
 * @param {string} email - The email of the new contact.
 * @param {string} phone - The phone number of the new contact.
 * @returns {Promise<boolean>} Resolves to true if the contact exists, otherwise false.
 */
async function checkIfContactAlreadyExists(email, phone) {
  const contacts = await fetchContacts();
  if (!contacts) return false;
  return Object.values(contacts).some((contact) => contact.email === email || contact.phone === phone);
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
  });
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
 *
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
