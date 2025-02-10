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

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete contact.");
    }

    console.log(`Contact with ID ${contactId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

/**
 * Reloads the current page.
 *
 */
function reloadPage() {
  location.reload();
}
