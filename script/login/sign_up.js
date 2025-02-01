import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let errorMessage = document.querySelector(".errorMessage");
let nameInput = document.querySelector(".inputName");
let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelectorAll(".inputPassword")[0];
let confirmPasswordInput = document.querySelectorAll(".inputPassword")[1];
let checkbox = document.getElementById("checkboxSignUp");

/**
 * This function validates the email input field by checking if the entered value matches a typical email format.
 * If the email is invalid, it sets the input field's border to red
 * and displays an error message below the input field.
 * If the email is valid, it hides the error message.
 *
 * Event listener on the email input triggers this validation whenever it's modified by the user.
 *
 * @returns {void}
 */
function validateEmail() {
  let emailValue = emailInput.value;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    emailInput.style.border = "1px solid red";
    errorMessage.innerHTML = `Please enter a valid email address.`;
    errorMessage.style.display = "block";
  } else {
    emailInput.style.border = "";
    errorMessage.style.display = "none";
  }
}

/**
 * This function validates if the entered password and confirm password fields match.
 * If they don't match, it sets the confirm password input field's border to red
 * and displays an error message below the input field.
 * If they match, it hides the error message.
 *
 * Event listener on the password input triggers this validation whenever it's modified by the user.
 *
 * @returns {void}
 */
function validatePasswords() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.style.border = "1px solid red";
    errorMessage.innerHTML = `Your passwords don't match. Please try again.`;
    errorMessage.style.display = "block";
  } else {
    confirmPasswordInput.style.border = "";
    errorMessage.style.display = "none";
  }
}

/**
 * This function validates the sign-up form fields and enables or disables the sign up button based on the form's validity.
 *
 * It checks if the name, email, password, and confirm password fields are filled out,
 * ensures that the email and confirm password fields do not have red borders (indicating an error)
 * and verifies that the checkbox is checked.
 *
 * If all validation conditions are met, it enables the submit button by removing the 'btnUnabledDark' class
 * and adding the 'btnDark' class.
 *
 * If any of the conditions are not met, it disables the sign up button by removing the 'btnDark' class
 * and adding the 'btnUnabledDark' class.
 *
 * Event listeners on the form inputs trigger this validation whenever any of these fields are modified by the user.
 *
 * @returns {void}
 */
function validateForm() {
  let signUpButton = document.getElementById("signUpBtn");
  let isFormValid =
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
  } else {
    signUpButton.classList.remove("btnDark");
    signUpButton.classList.add("btnUnabledDark");
  }
}

/**
 * This function updates the password input field's background icon based on its type and value.
 *
 * If the input has text, it displays a visibility icon (open or closed eye)
 * depending on whether the input type is "text" or "password".
 * If the input is empty, it reverts to the default lock icon.
 *
 * Event listeners attached to all elements with the class "inputPassword",
 * which will trigger on each "input" event (whenever the user types in the field).
 *
 * @this {HTMLInputElement} The password input field triggering the event.
 */
function updatePasswordIcon() {
  let inputType = this.type;

  if (this.value.length > 0) {
    this.style.backgroundImage = inputType === "text" ? "url(../../assets/icon/login/visibility.svg)" : "url(../../assets/icon/login/visibility_off.svg)";
    this.nextElementSibling.classList.remove("dNone");
  } else {
    this.style.backgroundImage = "url(../../assets/icon/login/lock.svg)";
    this.nextElementSibling.classList.add("dNone");
  }
}

/**
 * This function toggles the visibility of password inputs and updates the associated icon.
 *
 * When the input type is "password", the button's background will show an crossed-out eye icon (invisible text).
 * When the input type is "text", the button's background will show a open eye icon (visible text).
 *
 * Event Listeners are attached to all elements with the class 'passwordToggle'.
 * It triggers on a click event, invoking the toggleVisibility function for each matched element.
 *
 * Assumption:
 * The input element is the previous sibling of the element that triggers the event.
 */
function toggleVisibility() {
  let input = this.previousElementSibling;

  if (input.type === "password") {
    input.type = "text";
    input.style.backgroundImage = "url(../../assets/icon/login/visibility.svg)";
  } else {
    if (input.type === "text") {
      input.type = "password";
      input.style.backgroundImage = "url(../../assets/icon/login/visibility_off.svg)";
    }
  }
}

/**
 * Retrieves the next available ID based on the count of existing entries.
 *
 * @param {string} refPath - The path in the Firebase database (e.g., "Data/Users" or "Data/Contacts").
 * @param {string} prefix - The prefix to use for the ID (e.g., "userId" or "contactId").
 * @returns {Promise<string>} - The next ID in sequence (e.g., "userId1", "contactId2").
 */
async function getNextId(refPath, prefix) {
  const snapshot = await get(ref(database, refPath));
  const data = snapshot.val();
  const count = data ? Object.keys(data).length : 0;
  return `${prefix}${count + 1}`;
}

/**
 * Saves a new user to the database under Data/Users.
 *
 * @param {string} userId - The user ID to be used for the new user.
 * @param {Object} userData - The user data to be stored.
 */
async function saveUser(userId, userData) {
  await set(ref(database, `Data/Users/${userId}`), userData);
}

/**
 * Saves a new contact to the database under Data/Contacts.
 *
 * @param {string} contactId - The contact ID to be used for the new contact.
 * @param {Object} contactData - The contact data to be stored.
 */
async function saveContact(contactId, contactData) {
  await set(ref(database, `Data/Contacts/${contactId}`), contactData);
}

/**
 * Creates a new user and contact, saving them to the database.
 *
 */
async function createUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.querySelectorAll(".inputPassword")[0].value;
  const newUserId = await getNextId("Data/Users", "userId");
  await saveUser(newUserId, { name, email, password });
  const newContactId = await getNextId("Data/Contacts", "contactId");
  await saveContact(newContactId, { createdBy: newUserId, email, name, phone: "" });
  clearInput();
  showOverlay();
}

/**
 * This function clears the input values of the form.
 *
 * It resets the values of the input fields to their default empty states
 * and unchecks the checkbox.
 */
function clearInput() {
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
  checkbox.checked = false;
}

/**
 * This function displays the overlay and hides it after a delay.
 *
 * It removes the 'dNone' class from the element with the ID 'overlay',
 * making it visible. After a delay of 2000 milliseconds, the overlay is hidden
 * by calling the `hideOverlay` function.
 */
function showOverlay() {
  let overlay = document.getElementById('overlay');
  overlay.classList.remove('dNone');
  
  setTimeout(() => {
    hideOverlay();
  }, 2000);
}

/**
 * This function hides the overlay.
 *
 * It adds the 'dNone' class to the element with the ID 'overlay'.
 */
function hideOverlay() {
  document.getElementById('overlay').classList.add('dNone');
}

// Event listeners
emailInput.addEventListener("input", function () {
  validateEmail();
  validateForm();
});

confirmPasswordInput.addEventListener("input", function () {
  validatePasswords();
  validateForm();
});

nameInput.addEventListener("input", validateForm);

passwordInput.addEventListener("input", validateForm);

checkbox.addEventListener("change", validateForm);

document.querySelectorAll(".inputPassword").forEach((input) => {
  input.addEventListener("input", updatePasswordIcon);
});

document.querySelectorAll(".passwordToggle").forEach((toggle) => {
  toggle.addEventListener("click", toggleVisibility);
});

document.getElementById("signUpBtn").addEventListener("click", createUser);