/**
 * Checks if the form is valid and enables/disables the "Create Contact" button.
 *
 */
function checkEditFormValidity() {
  const isMobile = window.innerWidth <= 1000;
  const name = document.getElementById(isMobile ? "contactNameMobile" : "contactName").value.trim();
  const email = document.getElementById(isMobile ? "contactEmailMobile" : "contactEmail").value.trim();
  const phone = document.getElementById(isMobile ? "contactPhoneMobile" : "contactPhone").value.trim();
  const isValid = validateEditFields(name, email, phone);
  toggleSaveButton(isValid);
}

/**
 * Validates all input fields and updates the error messages.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} phone - The user's phone number.
 * @returns {boolean} True if all fields are valid, otherwise false.
 */
function validateEditFields(name, email, phone) {
  const mobilePlaceholder = window.innerWidth > 1000 ? "" : "Mobile";
  const isNameValid = validateEditInput(`contactName${mobilePlaceholder}`, name, validateName, "Please enter a valid name.");
  const isEmailValid = validateEditInput(`contactEmail${mobilePlaceholder}`, email, validateEmail, "Please enter a valid email address.");
  const isPhoneValid = validateEditInput(`contactPhone${mobilePlaceholder}`, phone, validatePhone, "Please enter a valid phone number.");
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
function validateEditInput(fieldId, value, validator, errorMessage) {
  const inputField = document.getElementById(fieldId);
  const errorField = document.getElementById(`errorMsgEdit${capitalize(fieldId)}`);

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
function toggleSaveButton(isValid) {
  const button = document.getElementById("saveButton");
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
