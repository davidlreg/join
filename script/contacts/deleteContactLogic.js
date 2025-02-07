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
 * Removes the contact from the Firebase database.
 *
 * @param {string} contactId - The ID of the contact to remove.
 */
async function deleteContactInDatabase(contactId) {
  await firebase.database().ref(`Data/Contacts/${contactId}`).remove();
}

/**
 * Reloads the current page.
 *
 */
function reloadPage() {
  location.reload();
}
