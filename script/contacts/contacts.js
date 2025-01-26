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
 * Inserts the floating contact template into the div provided for this purpose
 *
 */
function openContact() {
  const floatingConntactContainer = document.getElementById("floatingContactContainer");
  floatingConntactContainer.innerHTML = showFloatingContactOverlay();
  const overlay = floatingContactContainer.querySelector(".profileHeadSection");
  openFloatingContactOverlay(overlay);
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
