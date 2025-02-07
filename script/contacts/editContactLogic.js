/**
 * Opens the overlay for editing a existing contact, including setting content and event listeners.
 *
 */
function openEditContact(initials, color) {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showEditContactOverlay(initials, color);
  addOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".editContactOverlay");
  openOverlay(overlay);
}

/**
 * Opens the mobile overlay for editing an existing contact and applies the background styling.
 *
 */
function openEditContactMobile(initials, color) {
  const overlayContainer = document.getElementById("mobileOverlayContainer");
  overlayContainer.innerHTML = showEditContactOverlayMobile(initials, color);
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
 * Initiates the update process for a contact.
 * 
 * @param {string} contactId - The ID of the contact to update.
 */
async function updateContact(contactId) {
  const updatedData = getUpdatedContactData();
  await updateContactInDatabase(contactId, updatedData);
  reloadPage();
}

/**
 * Retrieves the updated contact data from the form inputs.
 * 
 * @returns {Object} - An object containing the updated name, email, and phone.
 */
function getUpdatedContactData() {
  return {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    phone: document.getElementById("contactPhone").value,
  };
}

/**
 * Updates the contact data in Firebase Realtime Database.
 * 
 * @param {string} contactId - The ID of the contact to update.
 * @param {Object} updatedData - An object containing the updated name, email, and phone.
 * @returns {Promise<void>} - A promise indicating the completion of the update.
 */
async function updateContactInDatabase(contactId, updatedData) {
  await firebase.database().ref(`Data/Contacts/${contactId}`).update(updatedData);
}

/**
 * Reloads the current page.
 * 
 */
function reloadPage() {
  location.reload();
}
