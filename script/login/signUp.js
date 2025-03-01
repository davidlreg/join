const databaseURL = 
  "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/";

const nameInput = document.querySelector(".inputName");
const emailInput = document.querySelector(".inputEmail");
const passwordInput = document.querySelectorAll(".inputPassword")[0];
const confirmPasswordInput = document.querySelectorAll(".inputPassword")[1];
const checkbox = document.getElementById("checkboxSignUp");

/**
 * Initializes sign-up functionality by adding event listeners.
 * Ensures form validation and toggles password visibility.
 */
function initSignUp() {
  addInputListeners();
  addPasswordToggleListeners();
}

/**
 * Adds event listeners for form validation and input interactions.
 */
function addInputListeners() {
  emailInput.addEventListener("blur", handleEmailBlur);
  passwordInput.addEventListener("blur", handlePasswordBlur);
  confirmPasswordInput.addEventListener("blur", handlePasswordBlur);
  nameInput.addEventListener("blur", validateForm);
  checkbox.addEventListener("change", validateForm);
  
  document.querySelectorAll(".inputPassword").forEach((input) => {
    input.addEventListener("input", updatePasswordIcon);
  });
}

/**
 * Adds event listeners for password visibility toggling.
 */
function addPasswordToggleListeners() {
  document.querySelectorAll(".passwordToggle").forEach((toggle) => {
    toggle.addEventListener("click", toggleVisibility);
  });
}

/**
 * Handles email input validation on blur.
 */
function handleEmailBlur() {
  validateEmail();
  validateForm();
}

/**
 * Handles password input validation on blur.
 */
function handlePasswordBlur() {
  validatePasswords();
  validateForm();
}

/**
 * Fetches data from the database.
 * 
 * @param {string} endpoint - The database endpoint to fetch data from.
 * @returns {Promise<Object>} The fetched data as an object.
 */
async function fetchData(endpoint) {
  const response = await fetch(`${databaseURL}${endpoint}.json`);
  return response.json();
}

/**
 * Saves data to the database.
 * 
 * @param {string} endpoint - The database endpoint where data should be saved.
 * @param {Object} data - The data to be saved.
 */
async function saveData(endpoint, data) {
  await fetch(`${databaseURL}${endpoint}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  });
}

/**
 * Validates the email input field.
 *
 * @returns {void}
 */
function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorMessage = document.getElementById("errorMsgEmail");

  if (!emailPattern.test(emailInput.value)) {
    emailInput.style.border = "1px solid red";
    errorMessage.innerHTML = `Please enter a valid email address.`;
  } else {
    emailInput.style.border = "";
    errorMessage.innerHTML = "";
  }
}

/**
 * Validates if the entered passwords match.
 *
 * @returns {void}
 */
function validatePasswords() {
  const errorMessage = document.getElementById("errorMsgPassword");

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.style.border = "1px solid red";
    errorMessage.innerHTML = `Your passwords don't match. Please try again.`;
  } else {
    confirmPasswordInput.style.border = "";
    errorMessage.innerHTML = "";
  }
}

/**
 * Validates the sign-up form fields and updates the sign-up button state.
 *
 * @returns {void}
 */
function validateForm() {
  const signUpButton = document.getElementById("signUpBtn");
  const isFormValid =
    nameInput.value !== "" &&
    emailInput.value !== "" &&
    emailInput.style.border !== "1px solid red" &&
    passwordInput.value !== "" &&
    confirmPasswordInput.value !== "" &&
    confirmPasswordInput.style.border !== "1px solid red" &&
    checkbox.checked;

  if (isFormValid) {
    signUpButton.classList.remove("btnUnabledDark");
    signUpButton.classList.add("btnDark");
    signUpButton.addEventListener("click", checkAvailability);
  } else {
    signUpButton.classList.remove("btnDark");
    signUpButton.classList.add("btnUnabledDark");
    signUpButton.removeEventListener("click", checkAvailability);
  }
}

/**
 * Updates the password input field's background icon based on its value.
 *
 * @this {HTMLInputElement}
 */
function updatePasswordIcon() {
  let inputType = this.type;

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
 * Toggles the visibility of the password input field.
 *
 * @this {HTMLElement}
 */
function toggleVisibility() {
  let input = this.previousElementSibling;

  if (input.type === "password") {
    input.type = "text";
    input.style.backgroundImage = "url(../../assets/icon/login/visibility.svg)";
  } else {
    input.type = "password";
    input.style.backgroundImage = "url(../../assets/icon/login/visibility_off.svg)";
  }
}

/**
 * Checks if the entered email address is already in use.
 * 
 * If the email is taken, displays an error message. Otherwise, proceeds to create a new user.
 */
async function checkAvailability() {
  let email = emailInput.value;
  const errorMessage = document.getElementById("errorMsgEmail");
  const users = await fetchData("Data/Users");

  if (users && Object.values(users).some(user => user.email === email)) {
    emailInput.style.border = "1px solid red";
    errorMessage.innerHTML = `This email address is already in use.`;
  } else {
    createUser();
  }
}

/**
 * Creates a new user and associated contact.
 * 
 * Redirects to the login page after a short delay.
 */
async function createUser() {
  let name = nameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;
  let userId = await getNextId("Data/Users", "userId");
  
  await saveUser(userId, { name, email, password });
  const contactId = await getNextId("Data/Contacts", "contactId");
  await saveContact(contactId, { createdBy: userId, email, name, phone: "" });
  
  showOverlay();

  setTimeout(function () {
    window.location.href = "../../html/login.html";
  }, 2000);
}

/**
 * Retrieves the next available ID for a given reference path.
 * 
 * @param {string} refPath - The reference path in the database.
 * @param {string} prefix - The prefix for the ID.
 * @returns {Promise<string>} The next available ID with the given prefix.
 */
async function getNextId(refPath, prefix) {
  const data = await fetchData(refPath);
  const count = data ? Object.keys(data).length : 0;
  return `${prefix}${count + 1}`;
}

/**
 * Saves user data to the database.
 * 
 * @param {string} userId - The unique ID of the user.
 * @param {Object} userData - The user data object.
 */
async function saveUser(userId, userData) {
  await saveData(`Data/Users/${userId}`, userData);
}

/**
 * Saves contact data to the database.
 * 
 * @param {string} contactId - The unique ID of the contact.
 * @param {Object} contactData - The contact data object.
 */
async function saveContact(contactId, contactData) {
  await saveData(`Data/Contacts/${contactId}`, contactData);
}

/**
 * Displays the overlay.
 *
 * @returns {void}
 */
function showOverlay() {
  let overlay = document.getElementById("overlay");
  overlay.classList.remove("dNone");
}

/**
 * Hides the overlay.
 *
 * @returns {void}
 */
function hideOverlay() {
  document.getElementById("overlay").classList.add("dNone");
}