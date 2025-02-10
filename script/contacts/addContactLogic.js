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
  closeOverlay(overlay);
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
 */
function createContact() {
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  getNextId().then((nextContactId) => {
    saveContact(nextContactId, email, name, phone);
  });

  closeAddContactOverlay();
  showContactCreatedMessage();
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
 * Displays a message confirming the contact was successfully created.
 *
 */
function showContactCreatedMessage() {
  const createdContactContainer = document.getElementById("createdContactContainer");
  createdContactContainer.innerHTML = showContactSucessfullyCreatedMessage();
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
