import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let nameInput = document.querySelector(".inputName");
let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelectorAll(".inputPassword")[0];
let confirmPasswordInput = document.querySelectorAll(".inputPassword")[1];
let checkbox = document.getElementById("checkboxSignUp");

/**
 * Validates the email input field.
 *
 * @returns {void}
 */
function validateEmail() {
  let emailValue = emailInput.value;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errorMessage = document.getElementById("errorMsgEmail");

  if (!emailPattern.test(emailValue)) {
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
  let errorMessage = document.getElementById("errorMsgPassword");

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.style.border = "1px solid red";
    errorMessage.innerHTML = `Your passwords don't match. Please try again.`;
  } else {
    confirmPasswordInput.style.border = "";
    errorMessage.innerHTML = "";
  }
}

/**
 * Checks if all required form fields are valid.
 *
 * @returns {boolean} True if the form is valid, otherwise false.
 */
function isFormValid() {
  return (
    nameInput.value !== "" &&
    emailInput.value !== "" &&
    emailInput.style.border !== "1px solid red" &&
    passwordInput.value !== "" &&
    confirmPasswordInput.value !== "" &&
    confirmPasswordInput.style.border !== "1px solid red" &&
    checkbox.checked
  );
}

/**
 * Updates the sign-up button's state based on form validation.
 *
 * @param {boolean} isValid - Whether the form is valid.
 * @returns {void}
 */
function updateSignUpButtonState(isValid) {
  let signUpButton = document.getElementById("signUpBtn");
  signUpButton.classList.toggle("btnDark", isValid);
  signUpButton.classList.toggle("btnUnabledDark", !isValid);
  signUpButton[isValid ? "addEventListener" : "removeEventListener"](
    "click",
    checkAvailability
  );
}

/**
 * Validates the sign-up form and updates the button state.
 *
 * @returns {void}
 */
function validateForm() {
  updateSignUpButtonState(isFormValid());
}

/**
 * Updates the password input field's background icon based on its value.
 *
 * @this {HTMLInputElement}
 */
function updatePasswordIcon() {
  let inputType = this.type;

  if (this.value.length > 0) {
    this.style.backgroundImage =
      inputType === "text"
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
    input.style.backgroundImage =
      "url(../../assets/icon/login/visibility_off.svg)";
  }
}

/**
 * Checks if the entered email is already registered.
 *
 * @returns {Promise<void>}
 */
async function checkAvailability() {
  const email = document.getElementById("userEmail").value;
  const errorMessage = document.getElementById("errorMsgEmail");
  const usersRef = ref(database, "Data/Users");
  const snapshot = await get(usersRef);
  const users = snapshot.val();

  if (users) {
    const emailExists = Object.values(users).some(
      (user) => user.email === email
    );

    if (emailExists) {
      emailInput.style.border = "1px solid red";
      errorMessage.innerHTML = `This email address is already in use.`;
    } else {
      createUser();
    }
  }
}

/**
 * Creates a new user and contact, saving them to the database.
 *
 * @returns {Promise<void>}
 */
async function createUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const password = passwordInput.value;
  const newUserId = await getNextId("Data/Users", "userId");
  await saveUser(newUserId, { name, email, password });
  const newContactId = await getNextId("Data/Contacts", "contactId");
  await saveContact(newContactId, {
    createdBy: newUserId,
    email,
    name,
    phone: "",
  });
  showOverlay();

  setTimeout(function () {
    window.location.href = "../../html/login.html";
  }, 2000);
}

/**
 * Retrieves the next available ID based on existing entries.
 *
 * @param {string} refPath
 * @param {string} prefix
 * @returns {Promise<string>}
 */
async function getNextId(refPath, prefix) {
  const snapshot = await get(ref(database, refPath));
  const data = snapshot.val();
  const count = data ? Object.keys(data).length : 0;
  return `${prefix}${count + 1}`;
}

/**
 * Saves a new user to the database.
 *
 * @param {string} userId
 * @param {Object} userData
 * @returns {Promise<void>}
 */
async function saveUser(userId, userData) {
  await set(ref(database, `Data/Users/${userId}`), userData);
}

/**
 * Saves a new contact to the database.
 *
 * @param {string} contactId
 * @param {Object} contactData
 * @returns {Promise<void>}
 */
async function saveContact(contactId, contactData) {
  await set(ref(database, `Data/Contacts/${contactId}`), contactData);
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

emailInput.addEventListener("blur", function () {
  validateEmail();
  validateForm();
});

passwordInput.addEventListener("blur", function () {
  validatePasswords();
  validateForm();
});

confirmPasswordInput.addEventListener("blur", function () {
  validatePasswords();
  validateForm();
});

nameInput.addEventListener("blur", validateForm);

checkbox.addEventListener("change", validateForm);

document.querySelectorAll(".inputPassword").forEach((input) => {
  input.addEventListener("input", updatePasswordIcon);
});

document.querySelectorAll(".passwordToggle").forEach((toggle) => {
  toggle.addEventListener("click", toggleVisibility);
});
