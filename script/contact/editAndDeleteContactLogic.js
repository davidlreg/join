/**
 * Opens the overlay for editing a existing contact, including setting content and event listeners.
 *
 */
function openEditContact(initials, color) {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showEditContactOverlay(initials, color);
  addOverlayBackground(overlayContainer);
  const inputIds = ["contactName", "contactEmail", "contactPhone"];
  const overlay = overlayContainer.querySelector(".editContactOverlay");
  inputIds.forEach((id) => {
    const inputElement = overlay.querySelector(`#${id}`);
    if (inputElement) {
      inputElement.addEventListener("input", checkEditFormValidity);
    }
  });
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
  const inputIds = ["contactNameMobile", "contactEmailMobile", "contactPhoneMobile"];
  const overlay = overlayContainer.querySelector(".editContactMobileWrapper");
  inputIds.forEach((id) => {
    const inputElement = overlay.querySelector(`#${id}`);
    if (inputElement) {
      inputElement.addEventListener("input", checkEditFormValidity);
    }
  });
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
async function updateContactData(contactId) {
  const updatedData = getUpdatedContactData();
  await updateContactInDatabase(contactId, updatedData);
  setTimeout(() => location.reload(), 200);
}

/**
 * Retrieves the updated contact data from the form inputs.
 *
 * @returns {Object} - An object containing the updated name, email, and phone.
 */
function getUpdatedContactData() {
  const isMobile = window.innerWidth <= 1000;
  const name = document.getElementById(isMobile ? "contactNameMobile" : "contactName").value.trim();
  const email = document.getElementById(isMobile ? "contactEmailMobile" : "contactEmail").value.trim();
  const phone = document.getElementById(isMobile ? "contactPhoneMobile" : "contactPhone").value.trim();

  return {
    name,
    email,
    phone,
  };
}

/**
 * Updates a contact in the database with the provided data.
 *
 * @param {string} contactId - The ID of the contact to update.
 * @param {Object} updatedData - The data to update the contact with.
 * @returns {Promise<void>} Resolves when the update is complete.
 */
async function updateContactInDatabase(contactId, updatedData) {
  const url = buildContactUrl(contactId);
  await sendPatchRequest(url, updatedData);
}

/**
 * Builds the URL for updating a contact.
 *
 * @param {string} contactId - The ID of the contact to update.
 * @returns {string} The URL for the PATCH request.
 */
function buildContactUrl(contactId) {
  return `https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/Data/Contacts/${contactId}.json`;
}

/**
 * Sends a PATCH request to update the contact in the database.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @returns {Promise<Object>} The response data from the request.
 */
async function sendPatchRequest(url, data) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

/**
 * Initiates the deletion of a contact by its ID.
 *
 * @param {string} contactId - The ID of the contact to delete.
 */
function deleteContact(contactId) {
  deleteContactData(contactId);
}

/**
 * Deletes contact data from the database.
 *
 * @param {string} contactId - The ID of the contact being deleted.
 */
async function deleteContactData(contactId) {
  await deleteContactInDatabase(contactId);
  reloadPage();
}

/**
 * Removes the contact from the Realtime Database by making a DELETE request.
 *
 * @param {string} contactId - The ID of the contact to remove.
 */
async function deleteContactInDatabase(contactId) {
  const url = `https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/Data/Contacts/${contactId}.json`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete contact.");
  }

  console.log(`Contact with ID ${contactId} deleted successfully.`);
}

/**
 * Reloads the current page.
 *
 */
function reloadPage() {
  location.reload();
}
