/**
 * Checks if the user is logged in or in guest mode.
 * Removes the class 'dNone' and shows the NavBar fully when logged in.
 */
function checkUserSession() {
  const userId = localStorage.getItem("userId");
  const isGuest = localStorage.getItem("guestMode");

  if (userId || isGuest) {
    document.getElementById("navbar").classList.remove("dNone");
  }
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
 * Generates initials from a full name.
 *
 * @param {string} fullName - The full name of the user.
 * @returns {string} The initials or "G" if the name is invalid.
 */
function getUserInitials(fullName) {
  if (!fullName) return "G";
  const nameParts = fullName.split(" ");
  return nameParts.length >= 2 ? nameParts[0][0] + nameParts[1][0] : fullName[0];
}

/**
 * Updates the header with the user's initials.
 */
function updateHeaderUserName() {
  const fullName = getStoredUserName();
  const initials = getUserInitials(fullName);
  document.getElementById("headerUserName").textContent = initials;
}

/**
 * Initializes the page by checking the user session and updating the header.
 */
function initializePage() {
  checkUserSession();
  updateHeaderUserName();
}

document.addEventListener("DOMContentLoaded", initializePage);
