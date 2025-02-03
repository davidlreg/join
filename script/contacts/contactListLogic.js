/**
 * Fetches JSON data from the backend.
 *
 * @async
 * @returns {Promise<void>} Resolves when data is fetched and stored in backendData.
 */
async function fetchDataJSON() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
  let responseAsJSON = await response.json();
  backendData = responseAsJSON;
}

/**
 * Renders contacts into the contact list after sorting and grouping.
 *
 */
function renderContactsInContactList() {
  const contacts = getContacts();
  const sortedContacts = sortContactsByName(contacts);
  const groupedContacts = groupContactsByFirstLetter(sortedContacts);
  renderGroupedContacts(groupedContacts);
}

/**
 * Retrieves contacts from the backend data.
 *
 * @returns {Array} An array of contact objects.
 */
function getContacts() {
  return Object.values(backendData.Data.Contacts);
}

/**
 * Sorts contacts alphabetically by name.
 *
 * @param {Array} contacts - An array of contact objects.
 * @returns {Array} The sorted array of contacts.
 */
function sortContactsByName(contacts) {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Groups contacts by the first letter of their name.
 *
 * @param {Array} contacts - Array of contact objects.
 * @returns {Object} An object with keys as first letters and values as arrays of contacts.
 */
function groupContactsByFirstLetter(contacts) {
  return contacts.reduce((groups, contact) => {
    const firstLetter = extractFirstLetter(contact.name);
    addContactToGroup(groups, firstLetter, contact);
    return groups;
  }, {});
}

/**
 * Extracts the first letter of a name and converts it to uppercase.
 *
 * @param {string} name - The name to extract the first letter from.
 * @returns {string} The uppercase first letter.
 */
function extractFirstLetter(name) {
  return name[0].toUpperCase();
}

/**
 * Adds a contact to a group by its first letter.
 *
 * @param {Object} groups - The object storing grouped contacts.
 * @param {string} letter - The letter to group the contact under.
 * @param {Object} contact - The contact object to add.
 */
function addContactToGroup(groups, letter, contact) {
  if (!groups[letter]) {
    groups[letter] = [];
  }
  groups[letter].push(contact);
}

/**
 * Renders grouped contacts into the contact list element.
 *
 * @param {Object} groupedContacts - An object with grouped contacts.
 */
function renderGroupedContacts(groupedContacts) {
  const contactList = document.getElementById("contactListInner");
  Object.entries(groupedContacts).forEach(([letter, contacts]) => {
    renderSectionHeader(contactList, letter);
    renderContactList(contactList, contacts);
  });
}

/**
 * Renders a section header for a contact group.
 *
 * @param {HTMLElement} contactList - The parent container for contact groups.
 * @param {string} letter - The letter for the group header.
 */
function renderSectionHeader(contactList, letter) {
  const headerHTML = `
    
  <div class="letterDividerBox">
    <h2 class="contactListLetter">${letter}</h2>
    <div class="dividerBottom"></div>
  </div>
  
  
    `;
  contactList.innerHTML += headerHTML;
}

/**
 * Renders a list of contacts within a group.
 *
 * @param {HTMLElement} contactList - The parent container for contact groups.
 * @param {Array} contacts - An array of contact objects to render.
 */
function renderContactList(contactList, contacts) {
  contacts.forEach((contact) => {
    contactList.innerHTML += renderContactTemplate(contact.name, contact.email, contact.phone);
  });
}
