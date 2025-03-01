const databaseURL =
  "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app";

const emailInput = document.querySelector(".inputEmail");
const passwordInput = document.querySelector(".inputPassword");
const passwordToggle = document.querySelector(".passwordToggle");

/**
 * Initializes login functionality by adding event listeners.
 * Ensures form validation and toggles password visibility.
 */
function initLogin() {
  document.addEventListener("DOMContentLoaded", checkUserSession);
  addEmailInputListeners();
  addPasswordInputListeners();
  passwordToggle.addEventListener("click", toggleVisibility);
}

/**
 * Adds event listeners for email input validation.
 */
function addEmailInputListeners() {
  emailInput.addEventListener("blur", () => {
    validateEmail();
    validateForm();
  });
}

/**
 * Adds event listeners for password input validation and visibility toggle.
 */
function addPasswordInputListeners() {
  passwordInput.addEventListener("blur", validateForm);
  passwordInput.addEventListener(
    "input",
    updatePasswordIcon.bind(passwordInput)
  );
}

/**
 * Redirects the user to the summary page if they are logged in or in guest mode.
 *
 * @returns {void}
 */
function checkUserSession() {
  const user = localStorage.getItem("userId");
  const guest = localStorage.getItem("guestMode");

  if (user || guest) {
    window.location.href = "./summary.html?active=summary&user=loggedIn";
  }
}

/**
 * Validates the email input field and updates the UI accordingly.
 *
 * @returns {void}
 */
function validateEmail() {
  const emailValue = emailInput.value;
  const errorMessage = document.getElementById("errorMsgEmail");

  localStorage.setItem("email", emailValue);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    emailInput.style.border = "1px solid red";
    errorMessage.innerHTML = "Please enter a valid email address.";
  } else {
    emailInput.style.border = "";
    errorMessage.innerHTML = "";
  }
}

/**
 * Validates the log-in form fields and updates the log in button state.
 *
 * @returns {void}
 */
function validateForm() {
  const logInButton = document.getElementById("logInBtn");
  const isFormValid =
    emailInput.value !== "" &&
    emailInput.style.border !== "1px solid red" &&
    passwordInput.value !== "";

  if (isFormValid) {
    logInButton.classList.remove("btnUnabledDark");
    logInButton.classList.add("btnDark");
    logInButton.setAttribute("onclick", "logIntoAccount()");
  } else {
    logInButton.classList.remove("btnDark");
    logInButton.classList.add("btnUnabledDark");
    logInButton.removeAttribute("onclick");
  }
}

/**
 * Updates the password input field's background icon based on its type and value.
 *
 * @this {HTMLInputElement}
 * @returns {void}
 */
function updatePasswordIcon() {
  const inputType = this.type;

  if (this.value.length > 0) {
    this.style.backgroundImage = inputType === "text"
        ? "url(../../assets/icon/login/visibility.svg)"
        : "url(../../assets/icon/login/visibility_off.svg)";
    this.nextElementSibling.classList.remove("dNone");
  } else {
    this.style.backgroundImage = "url(../../assets/icon/login/lock.svg)";
    this.nextElementSibling.classList.add("dNone");
  }
}

/**
 * Toggles the visibility of password inputs and updates the associated icon.
 *
 * @returns {void}
 */
function toggleVisibility() {
  const input = this.previousElementSibling;

  if (input.type === "password") {
    input.type = "text";
    input.style.backgroundImage = "url(../../assets/icon/login/visibility.svg)";
  } else {
    input.type = "password";
    input.style.backgroundImage = "url(../../assets/icon/login/visibility_off.svg)";
  }
}

/**
 * Enables guest mode and redirects to the summary page.
 *
 * @returns {void}
 */
function guestLogIn() {
  localStorage.setItem("guestMode", "true");
  window.location.href = "./summary.html?active=summary&user=guest";
}

/**
 * Logs into the user's account by retrieving input values.
 *
 * @returns {void}
 */
function logIntoAccount() {
  const email = emailInput.value;
  const password = passwordInput.value;
  checkUserCredentials(email, password);
}

/**
 * Fetches user data from the database.
 *
 * @returns {Promise<Object>} A promise resolving to the users object.
 */
function fetchUsers() {
  return fetch(`${databaseURL}/Data/Users.json`).then((response) =>
    response.json()
  );
}

/**
 * Finds a user by email and password.
 *
 * @param {Object} users - The users object from the database.
 * @param {string} email - The email provided by the user.
 * @param {string} password - The password provided by the user.
 * @returns {Object|null} The matched user or null if not found.
 */
function findUser(users, email, password) {
  return (
    Object.values(users).find(
      (user) => user.email === email && user.password === password
    ) || null
  );
}

/**
 * Handles the login process for a valid user.
 *
 * @param {Object} users - The users object from the database.
 * @param {Object} user - The authenticated user.
 */
function handleSuccessfulLogin(users, user) {
  localStorage.setItem(
    "userId",
    Object.keys(users).find((id) => users[id] === user)
  );
  window.location.href = "./summary.html?active=summary&user=loggedIn";
  passwordInput.style.border = "";
  document.getElementById("errorMsgCredentials").innerHTML = "";
}

/**
 * Displays an error message for invalid credentials.
 */
function handleFailedLogin() {
  document.getElementById("errorMsgCredentials").innerHTML =
    "Check your email and password. Please try again.";
}

/**
 * Checks the user credentials against the stored users in the database.
 *
 * @param {string} email - The email provided by the user.
 * @param {string} password - The password provided by the user.
 */
function checkUserCredentials(email, password) {
  fetchUsers().then((users) => {
    const user = findUser(users, email, password);
    user ? handleSuccessfulLogin(users, user) : handleFailedLogin();
  });
}
