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
  addEventListenersToOverlay(overlay);
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
function addEventListenersToOverlay(overlay) {
  const closeButton = overlay.querySelector(".closeButton");
  const cancelButton = overlay.querySelector(".cancelButton");
  closeButton.addEventListener("click", closeAddContactOverlay);
  cancelButton.addEventListener("click", closeAddContactOverlay);
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
