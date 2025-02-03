/**
 * Opens the overlay for editing a existing contact, including setting content and event listeners.
 *
 */
function openEditContact() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showEditContactOverlay();
  addOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".editContactOverlay");
  openOverlay(overlay);
}

/**
 * Opens the mobile overlay for editing an existing contact and applies the background styling.
 *
 */
function openEditContactMobile() {
  const overlayContainer = document.getElementById("mobileOverlayContainer");
  overlayContainer.innerHTML = showEditContactOverlayMobile();
  editOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".editContactMobileWrapper");
  openOverlayMobile(overlay);
}

/**
 * Closes the add contact overlay and removes its content.
 *
 */
function closeEditContactOverlay() {
  const overlay = document.querySelector(".editContactOverlay");
  closeOverlay(overlay);
  removeOverlayContent();
}

/**
 * Closes the mobile edit contact overlay and removes its content.
 *
 */
function closeEditContactOverlayMobile() {
  const overlay = document.querySelector(".editContactMobileWrapper");
  closeOverlayMobile(overlay);
  removeOverlayContentMobile();
}

/**
 * Adds a background styling class to the overlay container.
 *
 * @param {HTMLElement} container - The container element for the overlay.
 */
function editOverlayBackground(container) {
  container.classList.add("overlayBackground");
}

/**
 * Updates the contact data in Firebase Realtime Database.
 *
 * @param {string} currentContactId - The ID of the contact to update.
 * @returns {Promise<void>} - A promise indicating the completion of the update.
 */
async function updateContactData(currentContactId) {
  const updatedData = getUpdatedContactData();
  await updateContactInDatabase(currentContactId, updatedData);
  location.reload();
}

/**
 * Retrieves the updated contact data from the form inputs.
 *
 * @returns {Object} - An object containing the updated name, email, and phone.
 */
function getUpdatedContactData() {
  const updatedName = document.getElementById("contactName").value;
  const updatedEmail = document.getElementById("contactEmail").value;
  const updatedPhone = document.getElementById("contactPhone").value;

  return {
    name: updatedName,
    email: updatedEmail,
    phone: updatedPhone,
  };
}

/**
 * Updates the contact data in Firebase Realtime Database.
 *
 * @param {string} currentContactId - The ID of the contact to update.
 * @param {Object} updatedData - An object containing the updated name, email, and phone.
 * @returns {Promise<void>} - A promise indicating the completion of the update.
 */
async function updateContactInDatabase(currentContactId, updatedData) {
  const databaseRef = firebase.database().ref(`Data/Contacts/${currentContactId}`);

  await databaseRef.update(updatedData);
}
