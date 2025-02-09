/**
 * Initializes the Firebase application and database connection.
 * 
 */
const app = firebase.initializeApp(firebaseConfig);
const data = firebase.database(app);

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
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  getNextId().then(nextContactId => {
      saveContact(nextContactId, email, name, phone);
  });

  closeAddContactOverlay();
  showContactCreatedMessage();
}

/**
 * Fetches the next available contact ID from the database.
 *
 * @returns {Promise<number>} A promise resolving to the next available contact ID.
 */
function getNextId() {
  const contactsRef = data.ref('Data/Contacts'); 
  return new Promise((resolve, reject) => {
    contactsRef.once('value').then(snapshot => {
      const contacts = snapshot.val();
      let nextContactId = 1;

      if (contacts) {
        nextContactId = findSmallestAvailableId(contacts);
      }

      resolve(nextContactId);
    }).catch(reject);
  });
}

/**
 * Finds the smallest available contact ID by checking the existing ones.
 *
 * @param {Object} contacts - An object where keys are contact IDs (e.g., 'contactId1', 'contactId2', etc.).
 * @returns {number} The next available contact ID.
 */
function findSmallestAvailableId(contacts) {
  const contactIds = Object.keys(contacts);
  const usedIds = new Set();

  contactIds.forEach(contactId => {
    const idNumber = parseInt(contactId.replace('contactId', ''));
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
 * @param {number} nextContactId - The next available contact ID.
 * @param {string} email - The email address of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function saveContact(nextContactId, email, name, phone) {
  const contactsRef = data.ref('Data/Contacts');
  const newContactRef = contactsRef.child('contactId' + nextContactId);

  newContactRef.set({
      email: email,
      name: name,
      phone: phone
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
