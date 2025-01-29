function init() {
  setActiveLinkFromURL();
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

/**
 * Toggles the visibility of the user options menu.
 * If the menu is open, it will be closed; if it is closed, it will be opened.
 */
function toogleUser(){
  const userOptions = document.getElementById('userIcon');

  if(userOptions.classList.contains("active")) {
    userOptions.classList.remove("active")
  } else {
    userOptions.classList.add("active")
  }
}

/**
 * Logs the user out by redirecting them to the login page.
 */
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  
  window.location.href = "login.html";
}
