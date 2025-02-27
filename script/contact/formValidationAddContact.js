/**
 * Checks if the form is valid and enables/disables the "Create Contact" button.
 * 
 */
function checkFormValidity() {
  const isMobile = window.innerWidth <= 1000;
  const name = document.getElementById(isMobile ? "nameMobile" : "name").value.trim();
  const email = document.getElementById(isMobile ? "emailMobile" : "email").value.trim();
  const phone = document.getElementById(isMobile ? "phoneMobile" : "phone").value.trim();
  const isValid = validateFields(name, email, phone);
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
  const mobilePlaceholder = window.innerWidth > 1000 ? "" : "Mobile";
  const isNameValid = validateInput(`name${mobilePlaceholder}`, name, validateName, "Please enter a valid name.");
  const isEmailValid = validateInput(`email${mobilePlaceholder}`, email, validateEmail, "Please enter a valid email address.");
  const isPhoneValid = validateInput(`phone${mobilePlaceholder}`, phone, validatePhone, "Please enter a valid phone number.");
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

  errorField.innerHTML = "";
  if (value.trim() === "") {
    return false;
  }

  if (!validator(value)) {
    inputField.style.border = "1px solid red";
    errorField.innerHTML = errorMessage;
    return false;
  }

  inputField.style.border = "";
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