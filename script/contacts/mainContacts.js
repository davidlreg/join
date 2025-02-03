const firebaseConfig = {
  apiKey: "AIzaSyCHinD9iUXo-FhdnX7qBQDuuvVLIGlm90Q",
  authDomain: "joinbackend-9bd67.firebaseapp.com",
  databaseURL: "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "joinbackend-9bd67",
  storageBucket: "joinbackend-9bd67.firebasestorage.app",
  messagingSenderId: "747342236671",
  appId: "1:747342236671:web:40858f9f3ac55f267475ca",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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
 */
async function openContact(name, email, phone) {
  if (isContactAlreadySelected(name, email)) {
    resetSelectedContact();
    closeContactOverlay();
    return;
  }

  const contactId = await getContactIdByEmail(email);
  setCurrentlyViewedUser(name, email, phone, contactId);

  updateSelectedContact(name, email);
  toggleContactOverlay(name, email, phone);
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
 * Retrieves the contact ID by email from the Firebase Realtime Database.
 *
 * @param {string} email - The contact's email.
 * @returns {Promise<string|null>} - The contact ID if found, otherwise null.
 */
async function getContactIdByEmail(email) {
  const contactsRef = database.ref("Data/Contacts");
  const snapshot = await contactsRef.once("value");
  const contacts = snapshot.val();

  for (const contactId in contacts) {
    if (contacts[contactId].email === email) {
      return contactId;
    }
  }
  return null;
}

/**
 * Sets the currently viewed user.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 * @param {string|null} contactId - The contact's ID.
 */
function setCurrentlyViewedUser(name, email, phone, contactId) {
  currentlyViewedUser = { name, email, phone, contactId };
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

// Logic for the mobile edit & delete menu

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
