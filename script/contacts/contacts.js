let backendData = {};

async function init() {
  setActiveLinkFromURL();
  await prepareData();
}

async function prepareData() {
  await fetchDataJSON();
  renderContactsInContactList();
}

// Add new contact logic

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
 * Adds event listeners for closing the overlay to the close and cancel buttons.
 *
 * @param {Element} overlay The overlay element to add event listeners to.
 */
function addEventListenersToAddContactOverlay(overlay) {
  const closeButton = overlay.querySelector(".closeButton");
  const cancelButton = overlay.querySelector(".cancelButton");
  const createButton = overlay.querySelector(".createContactButton");
  const createButtonResponsive = overlay.querySelector(".closeContainer");
  closeButton.addEventListener("click", closeAddContactOverlay);
  cancelButton.addEventListener("click", closeAddContactOverlay);
  createButton.addEventListener("click", createContact);
  createButtonResponsive.addEventListener("click", closeAddContactOverlay);
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
 * Closes the provided overlay with a sliding effect.
 *
 * @param {Element} overlay The overlay element to be closed.
 */
function closeOverlay(overlay) {
  overlay.style.transform = "translateX(100%)";
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

// FLoating contact logic

/**
 * Determines the appropriate floating contact overlay to display based on screen width.
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
  const closeButton = overlay.querySelector(".closeContainer");
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

function createContact() {
  closeAddContactOverlay();
  showContactCreatedMessage();
}

function showContactCreatedMessage() {
  const createdContactContainer = document.getElementById("createdContactContainer");
  createdContactContainer.innerHTML = showContactSucessfullyCreatedMessage();
}

async function fetchDataJSON() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
  let responseAsJSON = await response.json();
  backendData = responseAsJSON;
}

function renderContactsInContactList() {
  const contacts = getContacts();
  const sortedContacts = sortContactsByName(contacts);
  const groupedContacts = groupContactsByFirstLetter(sortedContacts);
  renderGroupedContacts(groupedContacts);
}

function getContacts() {
  return Object.values(backendData.Data.Contacts);
}

function sortContactsByName(contacts) {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function groupContactsByFirstLetter(contacts) {
  return contacts.reduce((groups, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
    return groups;
  }, {});
}

function renderGroupedContacts(groupedContacts) {
  const contactList = document.getElementById("contactListInner");
  for (const letter in groupedContacts) {
    renderSectionHeader(contactList, letter);
    groupedContacts[letter].forEach((contact) => {
      contactList.innerHTML += renderContactTemplate(contact.name, contact.email, contact.phone);
    });
  }
}

function renderSectionHeader(contactList, letter) {
  contactList.innerHTML += `<div class="letterDividerBox"><h2 class="contactListLetter">${letter}</h2><div class="dividerBottom"></div></div>`;
}
