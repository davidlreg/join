let backendData = {};
let currentlyViewedUser = {};
let selectedContact = null;

/**
 * Checks if the user is logged in or if they are in guest mode by retrieving
 * the `userId` and `guestMode` values from localStorage. If neither value is present, the
 * user is redirected to the login page (`/login.html`).
 *
 * @event document#DOMContentLoaded
 * @listens document#DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("userId");
  const isGuest = localStorage.getItem("guestMode");

  if (!userId && !isGuest) {
    window.location.href = "./login.html";
  }
});

async function init() {
  setActiveLinkFromURL();
  await prepareData();
  headerUserName();
}

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
function removeOverlayContentMobile() {
  setTimeout(() => {
    const overlayContainer = document.getElementById("mobileOverlayContainer");
    overlayContainer.innerHTML = "";
    overlayContainer.classList.remove("overlayBackground");
  }, 300);
}

// Logic for the floating contact template

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
  if (window.innerWidth > 1350) {
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
  overlay.style.transition = "transform 0.2s ease-in-out";
  overlay.style.transform = "translateX(150%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

/**
 * Closes the floating contact overlay with a slide-out animation.
 *
 * @param {HTMLElement} overlay - The overlay element to be closed.
 */
function closeFloatingContactOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
  overlay.style.transform = "translateX(200%)";
  overlay.style.opacity = "0";

  setTimeout(() => {
    overlay.style.display = "none";
  }, 300);
}

// Logic for the mobile edit & delete menu

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

document.getElementById("editContactForm").addEventListener("submit", function(event) {
  if (!validateFormInput(event)) {
    event.preventDefault();
  }
});
