/**
 * Validates if the name is valid.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateName(name) {
  return /^[a-zA-Z\s]{2,}$/.test(name);
}

/**
 * Validates if the email is valid.
 *
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateEmail(email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
}

/**
 * Validates if the phone number is valid.
 *
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validatePhone(phone) {
  return /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/.test(phone);
}

/**
 * Checks if the form is valid and enables/disables the "Create Contact" button.
 *
 */
function checkFormValidity() {
  // Überprüfen, ob der Bildschirm kleiner als 1350px ist
  const isMobile = window.innerWidth <= 1350;

  // Wenn der Bildschirm kleiner als 1350px ist, benutze die mobilen Variablen
  const name = document.getElementById(isMobile ? "nameMobile" : "name").value.trim();
  const email = document.getElementById(isMobile ? "emailMobile" : "email").value.trim();
  const phone = document.getElementById(isMobile ? "phoneMobile" : "phone").value.trim();

  // Validierung der Felder
  const isValid = validateFields(name, email, phone);

  // Button aktivieren/deaktivieren
  toggleCreateButton(isValid);
}

/**
 * Validates all input fields and updates the error messages.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} phone - The user's phone number.
 * @returns {boolean} True if all fields are valid, otherwise false.
 */
function validateFields(name, email, phone) {
  const fieldPrefix = window.innerWidth > 1350 ? "" : "Mobile";
  const isNameValid = validateInput(`name${fieldPrefix}`, name, validateName, "Please enter a valid name.");
  const isEmailValid = validateInput(`email${fieldPrefix}`, email, validateEmail, "Please enter a valid email address.");
  const isPhoneValid = validateInput(`phone${fieldPrefix}`, phone, validatePhone, "Please enter a valid phone number.");
  return isNameValid && isEmailValid && isPhoneValid;
}

/**
 * Validates a single input field and updates its error message.
 *
 * @param {string} fieldId - The ID of the input field.
 * @param {string} value - The field's current value.
 * @param {Function} validator - The validation function.
 * @param {string} errorMessage - The error message to display.
 * @returns {boolean} True if the input is valid, otherwise false.
 */
function validateInput(fieldId, value, validator, errorMessage) {
  const inputField = document.getElementById(fieldId);
  const errorField = document.getElementById(`errorMsg${capitalize(fieldId)}`);

  if (!validator(value)) {
    inputField.style.border = "1px solid red";
    errorField.innerHTML = errorMessage;
    return false;
  }

  inputField.style.border = "";
  errorField.innerHTML = "";
  return true;
}

/**
 * Enables or disables the "Create Contact" button.
 *
 * @param {boolean} isValid - Whether the form is valid.
 */
function toggleCreateButton(isValid) {
  const button = document.getElementById("createContactBtn");
  button.disabled = !isValid;
  button.style.opacity = isValid ? "1" : "0.5";
  button.style.cursor = isValid ? "pointer" : "not-allowed";
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
