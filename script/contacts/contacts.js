let backendData = {};

async function init() {
  setActiveLinkFromURL();
  await prepareData();
}

async function prepareData() {
  await fetchDataJSON();
  renderContactsInContactList();
}

// Logic for adding contacts

/**
 * Opens the overlay for adding a new contact, including setting content and event listeners.
 *
 */
function openAddContactOverlay() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showAddContactOverlay();
  addOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".addContactOverlay");
  openOverlay(overlay);
  addEventListenersToAddContactOverlay(overlay);
}

function openAddContactOverlayMobile() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showAddContactOverlayMobile();
  addOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".addContactMobileWrapper");
  openOverlayMobile(overlay);
}

/**
 * Adds the overlay background class to the container.
 *
 * @param {Element} container The container to which the background class will be added.
 */
function addOverlayBackground(container) {
  container.classList.add("overlayBackground");
}

/**
 * Opens the provided overlay with a smooth transition effect.
 *
 * @param {Element} overlay The overlay element to be opened.
 */
function openOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(100%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

/**
 * Opens the provided overlay with a smooth transition effect.
 *
 * @param {Element} overlay The overlay element to be opened.
 */
function openOverlayMobile(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateY(100%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
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
 * Closes the add contact overlay and removes its content.
 *
 */
function closeAddContactOverlayMobile() {
  const overlay = document.querySelector(".addContactMobileWrapper");
  closeOverlayMobile(overlay);
  removeOverlayContent();
}

/**
 * Closes the provided overlay with a sliding effect.
 *
 * @param {Element} overlay The overlay element to be closed.
 */
function closeOverlay(overlay) {
  overlay.style.transform = "translateX(100%)";
}

/**
 * Closes the provided overlay with a sliding effect.
 *
 * @param {Element} overlay The overlay element to be closed.
 */
function closeOverlayMobile(overlay) {
  overlay.style.transform = "translateY(100%)";
}

/**
 * Removes the content and background of the overlay after a delay.
 *
 */
function removeOverlayContent() {
  setTimeout(() => {
    const overlayContainer = document.getElementById("overlayContainer");
    overlayContainer.innerHTML = "";
    overlayContainer.classList.remove("overlayBackground");
  }, 300);
}

// Floating contact template logic

/**
 * Determines the appropriate floating contact overlay to display based on screen width.
 *
 */
function openContact(name, email, phone) {
  const screenWidth = window.innerWidth; // Get screen width

  if (screenWidth > 1080) {
    showDesktopContactOverlay(name, email, phone);
  } else {
    showMobileContactOverlay(name, email, phone);
  }
}

/**
 * Displays the desktop version of the floating contact overlay.
 *
 */
function showDesktopContactOverlay(name, email, phone) {
  const floatingContactContainer = document.getElementById("floatingContactContainer");
  if (!floatingContactContainer) return; // Handle case where the container doesn't exist

  floatingContactContainer.innerHTML = showFloatingContactOverlay(name, email, phone); // Insert desktop overlay content
  const overlay = floatingContactContainer.querySelector(".profileHeadSection");
  openFloatingContactOverlay(overlay); // Open or process the overlay
}

/**
 * Displays the mobile version of the floating contact overlay.
 *
 */
function showMobileContactOverlay(name, email, phone) {
  const floatingContactContainer = document.getElementById("contactList");
  if (!floatingContactContainer) return; // Handle case where the container doesn't exist

  floatingContactContainer.innerHTML = ""; // Clear previous content
  floatingContactContainer.innerHTML = showFloatingContactOverlayMobile(name, email, phone); // Insert mobile overlay content
}

/**
 * Opens the provided overlay with a smooth transition effect.
 *
 * @param {Element} overlay The overlay element to be opened.
 */
function openFloatingContactOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(100%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

// Edit contact logic

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
  addEventListenersToEditContactOverlay(overlay);
}

/**
 * Adds event listeners for closing the overlay to the close and cancel buttons.
 *
 * @param {Element} overlay The overlay element to add event listeners to.
 */
function addEventListenersToEditContactOverlay(overlay) {
  const deleteButton = overlay.querySelector(".deleteButton");
  const closeButton = overlay.querySelector(".closeButton");
  deleteButton.addEventListener("click", closeEditContactOverlay);
  closeButton.addEventListener("click", closeEditContactOverlay);
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

// Create contact logic

function createContact() {
  closeAddContactOverlay();
  showContactCreatedMessage();
}

function showContactCreatedMessage() {
  const createdContactContainer = document.getElementById("createdContactContainer");
  createdContactContainer.innerHTML = showContactSucessfullyCreatedMessage();
}

/**
 * Generates a message indicating that a contact has been successfully created.
 *
 * @function showContactSucessfullyCreatedMessage
 * @returns {string} HTML markup for the success message.
 */
function showContactSucessfullyCreatedMessage() {
  return `
  
  <div class="contactSucessfullyCretaed" id="contactSucessfullyCretaed">
    <p>Contact succesfully created</p>
  </div>
  
  `;
}

// Contact list logic

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
