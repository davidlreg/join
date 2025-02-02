let backendData = {};
let currentlyViewedUser = {};
let selectedContact = null;

async function init() {
  setActiveLinkFromURL();
  await prepareData();
  headerUserName();
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

/**
 * Removes the content and background of the overlay after a delay.
 *
 */
function removeOverlayContentEditMobile() {
  setTimeout(() => {
    const overlayContainer = document.getElementById("mobileOverlayContainer");
    overlayContainer.innerHTML = "";
    overlayContainer.classList.remove("overlayBackground");
  }, 300);
}

// Floating contact template logic

/**
 * Opens or closes a contact overlay and highlights the selected contact.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 */
function openContact(name, email, phone) {
  if (selectedContact && selectedContact.innerText.includes(name) && selectedContact.innerText.includes(email)) {
    resetSelectedContact();
    closeContactOverlay();
    return;
  }
  currentlyViewedUser = { name, email, phone };
  updateSelectedContact(name, email);
  toggleContactOverlay(name, email, phone);
}

/**
 * Updates the selected contact by removing the previous selection and adding the active class to the new selection.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 */
function updateSelectedContact(name, email) {
  resetSelectedContact();
  selectedContact = [...document.querySelectorAll(".contact")].find((contact) => contact.innerText.includes(name) && contact.innerText.includes(email));
  if (selectedContact) {
    selectedContact.classList.add("active-contact");
  }
}

/**
 * Resets the selected contact to default state.
 */
function resetSelectedContact() {
  if (selectedContact) {
    selectedContact.classList.remove("active-contact");
    selectedContact = null;
  }
}

/**
 * Toggles the contact overlay based on screen width.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 */
function toggleContactOverlay(name, email, phone) {
  if (window.innerWidth > 1350) {
    showDesktopContactOverlay(name, email, phone);
  } else {
    showMobileContactOverlay(name, email, phone);
  }
}

/**
 * Closes the contact overlay.
 */
function closeContactOverlay() {
  const overlay = document.querySelector(".profileHeadSection");
  if (overlay) {
    closeFloatingContactOverlay(overlay);
  }
}

/**
 * Displays the desktop version of the floating contact overlay.
 *
 */
function showDesktopContactOverlay(name, email, phone) {
  const floatingContactContainer = document.getElementById("floatingContactContainer");
  floatingContactContainer.innerHTML = showFloatingContactOverlay(name, email, phone);
  const overlay = floatingContactContainer.querySelector(".profileHeadSection");
  openFloatingContactOverlay(overlay);
}

/**
 * Displays the mobile version of the floating contact overlay.
 *
 */
function showMobileContactOverlay(name, email, phone) {
  const floatingContactContainer = document.getElementById("contactList");
  floatingContactContainer.innerHTML = "";
  floatingContactContainer.innerHTML = showFloatingContactOverlayMobile(name, email, phone);
}

/**
 * Opens the provided overlay with a smooth transition effect.
 *
 * @param {Element} overlay The overlay element to be opened.
 */
function openFloatingContactOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(150%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

/**
 * Closes the floating contact overlay with a slide-out animation.
 *
 * @param {HTMLElement} overlay - The overlay element to be closed.
 */
function closeFloatingContactOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(150%)";
}

// Logic for editing contacts

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
  removeOverlayContentEditMobile();
}

/**
 * Adds a background styling class to the overlay container.
 *
 * @param {HTMLElement} container - The container element for the overlay.
 */
function editOverlayBackground(container) {
  container.classList.add("overlayBackground");
}

function updateContactData() {
  console.log("UPDATE CONTACT TEST");
}

// Logic for creating contacts

function createContact() {
  console.log("CREATE CONTACT TEST");
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

// Logic for deleting contacts

function deleteContact() {
  console.log("DELETE CONTACT TEST");
}

// Logic for contact list

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

// Logic for mobile edit & delete menu

/**
 * Opens the mobile contact menu by rendering the overlay and adding a close event listener.
 */
function openMobileContactMenu() {
  const menuContainer = document.getElementById("mobileMenu");
  menuContainer.innerHTML = showMobileContactMenu();

  const overlay = menuContainer.querySelector(".openMobileContactMenuContainer");
  openOverlay(overlay);
  addCloseEventListener(overlay, menuContainer);
}

/**
 * Closes the overlay with a sliding animation and removes it from the DOM.
 * @param {HTMLElement} overlay - The overlay element to be closed.
 */
function closeOverlayWithAnimation(overlay) {
  applyTransition(overlay, "translateX(0)", "translateX(100%)", () => overlay.remove());
}

/**
 * Applies a smooth transition to an element.
 * @param {HTMLElement} element - The element to animate.
 * @param {string} startTransform - The initial transform value.
 * @param {string} endTransform - The final transform value.
 * @param {Function} [callback] - Optional callback function after the transition ends.
 */
function applyTransition(element, startTransform, endTransform, callback) {
  element.style.transition = "transform 0.3s ease-in-out";
  element.style.transform = startTransform;

  setTimeout(() => {
    element.style.transform = endTransform;
    if (callback) setTimeout(callback, 300);
  }, 10);
}

/**
 * Adds an event listener to close the overlay when clicking outside of it.
 * @param {HTMLElement} overlay - The overlay element.
 * @param {HTMLElement} menuContainer - The container of the menu.
 */
function addCloseEventListener(overlay, menuContainer) {
  setTimeout(() => {
    document.addEventListener("click", function closeOverlay(event) {
      if (!overlay.contains(event.target) && !menuContainer.contains(event.target)) {
        closeOverlayWithAnimation(overlay);
        document.removeEventListener("click", closeOverlay);
      }
    });
  }, 0);
}
