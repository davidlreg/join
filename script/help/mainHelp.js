/**
 * Checks the user's session status based on stored localStorage values.
 * Updates the UI to show navigation elements or the login link.
 *
 */
function checkUserSession() {
  const userId = localStorage.getItem("userId");
  const isGuest = localStorage.getItem("guestMode");

  if (userId || isGuest) {
    document.getElementById("navbar").classList.remove("dNone");
  } else {
    document.getElementById("logInLink").classList.remove("dNone");
    overrideMediaQuery();
  }
}

/**
 * Overrides the default media query styles by injecting a custom CSS style tag.
 *
 */
function overrideMediaQuery() {
  const styleId = "override-sidebar-footer";
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = styleContent();
}

/**
 * Retrieves the stored username from localStorage.
 *
 * @returns {string} The stored name or an empty string if not found.
 */
function getStoredUserName() {
  return localStorage.getItem("headerName") || "";
}

/**
 * Generates initials from a full name when a user or guest is logged in.
 *
 * @param {string} fullName - The full name of the user.
 * @returns {string} The initials or "G" if the name is invalid.
 */
function getUserInitials(fullName) {
  const userId = localStorage.getItem("userId");
  const isGuest = localStorage.getItem("guestMode");

  if (userId || isGuest) {
    if (!fullName) return "G";
    const nameParts = fullName.split(" ");
    return nameParts.length >= 2
      ? nameParts[0][0] + nameParts[1][0]
      : fullName[0];
  }
}

/**
 * Updates the header with the user's initials.
 *
 */
function updateHeaderUserName() {
  const fullName = getStoredUserName();
  const initials = getUserInitials(fullName);
  document.getElementById("headerUserName").textContent = initials;
}

/**
 * Initializes the page by checking the user session and updating the header.
 *
 */
function initializePage() {
  checkUserSession();
  updateHeaderUserName();
}
