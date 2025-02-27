function init() {
  setActiveLinkFromURL();
}

/**
 * Changes the background colour of the currently clicked element in the sidebar.
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
 *
 */
function toogleUser() {
  const userOptions = document.getElementById("userIcon");
  userOptions.classList.toggle("active");
}

/**
<<<<<<< HEAD
 * Updates the header username display based on localStorage value.
 *
=======
 * Updates the content to display the initials of the user's name.
 * 
 * If the name consists of one part, only the first letter of that part will be displayed.
 * If the name consists of two parts, the first letter of each part will be shown.
 * 
 * If no name is found in localStorage, the function sets the content to "G" for guest.
>>>>>>> a4c7ae843e1fe5266354c30e6d6406a2bbe566f5
 */
function headerUserName() {
  const headerName = localStorage.getItem("headerName");
  if (headerName) {
<<<<<<< HEAD
    const nameParts = headerName.split(" ");
    document.getElementById("headerUserName").textContent = nameParts[0][0] + nameParts[1][0];
=======
    nameParts = headerName.split(" ");
    if (nameParts.length === 1) {
      document.getElementById("headerUserName").textContent = nameParts[0][0];
    } else {
      document.getElementById("headerUserName").textContent = nameParts[0][0] + nameParts[1][0];
    }
>>>>>>> a4c7ae843e1fe5266354c30e6d6406a2bbe566f5
  } else {
    document.getElementById("headerUserName").textContent = "G";
  }
}


/**
 * Logs the user out by redirecting them to the login page.
 *
 */
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "login.html";
}
