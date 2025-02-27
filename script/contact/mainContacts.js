let backendData = {};
let currentlyViewedUser = {};
let selectedContact = null;

/**
 * Initializes the application by setting the active link and preparing data.
 * 
 * @async
 * @function
 */
async function init() {
  setActiveLinkFromURL();
  await prepareData();
  headerUserName();
}

/**
 * Prepares data by fetching JSON data and rendering contacts.
 * 
 * @async
 * @function
 */
async function prepareData() {
  await fetchDataJSON();
  renderContactsInContactList();
}

/**
 * Opens the provided overlay with a smooth transition effect.
 *
 * @param {Element} overlay The overlay element to be opened.
 */
function openOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(1000%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

/**
 * Opens the provided overlay with a smooth transition effect.
 *
 * @param {Element} overlay The overlay element to be opened.
 */
function openOverlayMobile(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateY(1000%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

/**
 * Closes the provided overlay with a sliding effect.
 *
 * @param {Element} overlay The overlay element to be closed.
 */
function closeOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(1000%)";
}

/**
 * Closes the provided overlay with a sliding effect.
 *
 * @param {Element} overlay The overlay element to be closed.
 */
function closeOverlayMobile(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateY(1000%)";
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
function removeOverlayContentMobile() {
  setTimeout(() => {
    const overlayContainer = document.getElementById("mobileOverlayContainer");
    overlayContainer.innerHTML = "";
    overlayContainer.classList.remove("overlayBackground");
  }, 300);
}

/**
 * Opens or closes the contact overlay and highlights the selected contact.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 * @param {string} initials - The initials of the contact.
 * @param {string} color - The color associated with the contact.
 */
async function openContact(name, email, phone, initials, color) {
  if (isContactAlreadySelected(name, email)) {
    resetSelectedContact();
    closeContactOverlay();
    return;
  }

  const contactId = await getContactIdByEmail(email);

  setCurrentlyViewedUser(name, email, phone, contactId, initials, color);
  updateSelectedContact(name, email);
  toggleContactOverlay(name, email, phone, initials, color, contactId);
}

/**
 * Checks if the selected contact is already open.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @returns {boolean} - True if the contact is already selected, otherwise false.
 */
function isContactAlreadySelected(name, email) {
  return selectedContact && selectedContact.innerText.includes(name) && selectedContact.innerText.includes(email);
}

/**
 * Fetches all contacts from the database.
 *
 * @returns {Promise<Object>} The contacts data.
 */
async function fetchContacts() {
  const response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/Data/Contacts.json");
  return response.json();
}

/**
 * Finds a contact ID by email in the provided contacts data.
 *
 * @param {Object} contacts - The contacts data.
 * @param {string} email - The contact's email.
 * @returns {string|null} The contact ID if found, otherwise null.
 */
function findContactIdByEmail(contacts, email) {
  for (const contactId in contacts) {
    if (contacts[contactId].email === email) {
      return contactId;
    }
  }
  return null;
}

/**
 * Retrieves the contact ID by email from the Firebase Realtime Database.
 *
 * @param {string} email - The contact's email.
 * @returns {Promise<string|null>} The contact ID if found, otherwise null.
 */
async function getContactIdByEmail(email) {
  try {
    const contacts = await fetchContacts();
    const contactId = findContactIdByEmail(contacts, email);

    if (contactId) {
      return contactId;
    }

    console.warn("No contact ID found for email:", email);
    return null;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return null;
  }
}

/**
 * Sets the currently viewed user.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 * @param {string|null} contactId - The contact's ID.
 * @param {string} initials - The initials of the contact.
 * @param {string} color - The color associated with the contact.
 */
function setCurrentlyViewedUser(name, email, phone, contactId, initials, color) {
  currentlyViewedUser = { name, email, phone, contactId, initials, color };
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
 * 
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
 * @param {string} initials - The contact's initials.
 * @param {string} color - The contact's profile color.
 */
function toggleContactOverlay(name, email, phone, initials, color, contactId) {
  if (window.innerWidth > 1000) {
    showDesktopContactOverlay(name, email, phone, initials, color, contactId);
  } else {
    showMobileContactOverlay(name, email, phone, initials, color, contactId);
  }
}

/**
 * Displays the desktop version of the floating contact overlay.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 * @param {string} initials - The contact's initials.
 * @param {string} color - The contact's profile color.
 */
function showDesktopContactOverlay(name, email, phone, initials, color, contactId) {
  const floatingContactContainer = document.getElementById("floatingContactContainer");
  floatingContactContainer.innerHTML = showFloatingContactOverlay(name, email, phone, initials, color, contactId);
  const overlay = floatingContactContainer.querySelector(".profileHeadSection");
  openFloatingContactOverlay(overlay);
}

/**
 * Displays the mobile version of the floating contact overlay.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 * @param {string} initials - The contact's initials.
 * @param {string} color - The contact's profile color.
 */
function showMobileContactOverlay(name, email, phone, initials, color, contactId) {
  const floatingContactContainer = document.getElementById("contactList");
  floatingContactContainer.innerHTML = "";
  floatingContactContainer.innerHTML = showFloatingContactOverlayMobile(name, email, phone, initials, color, contactId);
}

/**
 * Closes the contact overlay.
 * 
 */
function closeContactOverlay() {
  const overlay = document.querySelector(".profileHeadSection");
  if (overlay) {
    closeFloatingContactOverlay(overlay);
  }
}

/**
 * Opens the provided overlay with a smooth transition effect.
 *
 * @param {Element} overlay The overlay element to be opened.
 */
function openFloatingContactOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(1000%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

/**
 * Closes the floating contact overlay with a slide-out animation.
 *
 * @param {HTMLElement} overlay - The overlay element to be closed.
 */
function closeFloatingContactOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
  overlay.style.transform = "translateX(1000%)";
  overlay.style.opacity = "0";

  setTimeout(() => {
    overlay.style.display = "none";
  }, 300);
}

/**
 * Opens the mobile contact menu by rendering the overlay and adding a close event listener.
 *
 * @param {string} initials - The initials of the contact.
 * @param {string} color - The color associated with the contact.
 */
function openMobileContactMenu(initials, color, contactId) {
  const menuContainer = document.getElementById("mobileMenu");
  menuContainer.innerHTML = showMobileContactMenu(initials, color, contactId);

  const overlay = menuContainer.querySelector(".openMobileContactMenuContainer");
  openOverlay(overlay);
  addCloseEventListener(overlay, menuContainer);
}

/**
 * Closes the overlay with a sliding animation and removes it from the DOM.
 *
 * @param {HTMLElement} overlay - The overlay element to be closed.
 */
function closeOverlayWithAnimation(overlay) {
  applyTransition(overlay, "translateX(0)", "translateX(200%)", () => overlay.remove());
}

/**
 * Applies a smooth transition to an element.
 *
 * @param {HTMLElement} element - The element to animate.
 * @param {string} startTransform - The initial transform value.
 * @param {string} endTransform - The final transform value.
 * @param {Function} [callback] - Optional callback function after the transition ends.
 */
function applyTransition(element, startTransform, endTransform, callback) {
  element.style.transition = "transform 0.2s ease-in-out";
  element.style.transform = startTransform;

  setTimeout(() => {
    element.style.transform = endTransform;
    if (callback) setTimeout(callback, 300);
  }, 10);
}

/**
 * Adds an event listener to close the overlay when clicking outside of it.
 *
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

/**
 * Validates if the name is valid.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateName(name) {
  return /^[a-zA-Z\s]{2,}$/.test(name);
}

/**
 * Validates if the email is valid.
 *
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateEmail(email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
}

/**
 * Validates if the phone number is valid.
 *
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validatePhone(phone) {
  return /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/.test(phone);
}
