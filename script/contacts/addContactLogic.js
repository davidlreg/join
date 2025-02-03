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
 * Adds the overlay background class to the container.
 *
 * @param {Element} container The container to which the background class will be added.
 */
function addOverlayBackground(container) {
  container.classList.add("overlayBackground");
}

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
