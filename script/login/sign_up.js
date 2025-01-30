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
 * Triggered when the user makes changes in the input field
 * document.querySelector(".inputEmail").addEventListener("input", validateEmail);
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

emailInput.addEventListener("input", validateEmail);

/**
 * This function validates if the entered password and confirm password fields match.
 * If they don't match, it sets the confirm password input field's border to red
 * and displays an error message below the input field.
 * If they match, it hides the error message.
 *
 * Triggered when the user makes changes in the confirm password field
 * confirmPasswordInput.addEventListener("input", validatePasswords);
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

confirmPasswordInput.addEventListener("input", validatePasswords);

/**
 * This function validates the sign-up form fields and enables or disables the sign up button based on the form's validity.
 * 
 * It checks if the name, email, password, and confirm password fields are filled out,
 * ensures that the email and confirm password fields do not have red borders (indicating an error)
 * and verifies that the checkbox is checked.
 * 
 * If all validation conditions are met, it enables the submit button by removing the 'btnUnabledDark' class
 * and adding the 'btnDark' class.
 * It sets the 'onclick' attribute of the sign up button to trigger the 'signUpSuccessful()' function.
 * 
 * If any of the conditions are not met, it disables the sign up button by removing the 'btnDark' class
 * and adding the 'btnUnabledDark' class.
 * It also removes the 'onclick' attribute.
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
    signUpButton.setAttribute("onclick", "signUpSuccessful");
  } else {
    signUpButton.classList.remove("btnDark");
    signUpButton.classList.add("btnUnabledDark");
    signUpButton.removeAttribute("onclick");
  }
}

nameInput.addEventListener("input", validateForm);

emailInput.addEventListener("input", validateForm);

passwordInput.addEventListener("input", validateForm);

confirmPasswordInput.addEventListener("input", validateForm);

checkbox.addEventListener("change", validateForm);

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
      this.style.backgroundImage = inputType === "text"
          ? "url(../../assets/icon/login/visibility.svg)"
          : "url(../../assets/icon/login/visibility_off.svg)";
      this.nextElementSibling.classList.remove("dNone");
  } else {
      this.style.backgroundImage = "url(../../assets/icon/login/lock.svg)";
      this.nextElementSibling.classList.add("dNone");
  }
}

document.querySelectorAll(".inputPassword").forEach(input => {
  input.addEventListener("input", updatePasswordIcon);
});

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

document.querySelectorAll('.passwordToggle').forEach(toggle => {
  toggle.addEventListener('click', toggleVisibility)});