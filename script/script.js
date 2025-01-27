let backendData = {}; // Anstelle eines Arrays ein Objekt für die Kontakte.
let currentContactIndex = 0;

async function init() {
  setActiveLinkFromURL();
  // changeInputBoardLocation();
  await fetchDataJSON();
  renderContactsInContactList();
}

/**
 * This function changes the background colour of the currently clicked element in the sidebar.
 *
 */
function setActiveLinkFromURL() {
  const activeParam = getActiveParamFromURL();
  const navLinks = document.querySelectorAll(".nav-link");
  removeActiveClassFromAllLinks(navLinks);
  if (activeParam) {
    setActiveClassForLink(navLinks, activeParam);
  }
}

/**
 * Retrieves the value of the 'active' URL parameter to determine the active section or index.
 *
 * @returns {string} The value of the 'active' parameter.
 */
function getActiveParamFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("active");
}

/**
 * Removes the 'active' class from all provided links.
 *
 * @param {NodeListOf<Element>} links The list of links to remove the 'active' class from.
 */
function removeActiveClassFromAllLinks(links) {
  links.forEach((link) => link.classList.remove("active"));
}

/**
 * Adds the 'active' class to the link matching the provided 'param'.
 *
 * @param {NodeListOf<Element>} links The list of links to search through.
 * @param {string} param The 'active' parameter value to match against the links.
 */
function setActiveClassForLink(links, param) {
  links.forEach((link) => {
    if (new URL(link.href).searchParams.get("active") === param) {
      link.classList.add("active");
    }
  });
}

/**
 * Go back in browser history.
 *
 */
function historyBack() {
  window.history.back();
}

async function fetchDataJSON() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
  let responseAsJSON = await response.json();
  backendData = responseAsJSON;
}

function renderContactsInContactList() {
  const contacts = backendData.Data.Contacts;
  for (let contactId in contacts) {
    const contact = contacts[contactId];
    const contactList = document.getElementById("contactList");
    contactList.innerHTML += renderContactTemplate(contact.name, contact.email, contact.phone);
  }
}
