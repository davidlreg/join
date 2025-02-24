let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelector(".inputPassword");
let passwordToggle = document.querySelector(".passwordToggle");

// Firebase Realtime Database URL
const databaseUrl = "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Redirects the user to the summary page if they are logged in or in guest mode.
 *
 * It runs with an eventListener when the DOM is fully loaded
 * and checks for the presence of `userId` or `guestMode` in local storage.
 * 
 * If either exists, the user is redirected to the summary page.
 */
function checkUserSession() {
  let user = localStorage.getItem("userId");
  let guest = localStorage.getItem("guestMode");

  if (user || guest) {
    window.location.href = "./summary.html?active=summary&user=loggedIn";
  }
}

/**
 * Validates the email input field by checking if the entered value matches a typical email format.
 *
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
  let errorMessage = document.getElementById("errorMsgEmail");
  
  localStorage.setItem("email", emailValue);
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    emailInput.style.border = "1px solid red";
    errorMessage.innerHTML = `Please enter a valid email address.`;
  } else {
    emailInput.style.border = "";
    errorMessage.innerHTML = "";
  }
}

/**
 * Validates the log-in form fields and enables or disables the log in button based on the form's validity.
 *
 * It checks if the email and password fields are filled out
 * and ensures that the email field does not have red borders (indicating an error).
 *
 * If all validation conditions are met, it enables the log in button by removing the 'btnUnabledDark' class
 * and adding the 'btnDark' class.
 * It sets the 'onclick' attribute of the log in button to trigger the redirection to the summary page.
 *
 * If any of the conditions are not met, it disables the log in button by removing the 'btnDark' class
 * and adding the 'btnUnabledDark' class.
 * It also removes the 'onclick' attribute.
 *
 * Event listeners on the form inputs trigger this validation whenever any of these fields are modified by the user.
 *
 * @returns {void}
 */
function validateForm() {
  let logInButton = document.getElementById("logInBtn");
  let isFormValid = emailInput.value !== "" && emailInput.style.border !== "1px solid red" && passwordInput.value !== "";

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
 * Toggles the visibility of password inputs and updates the associated icon.
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
 * Enables guest mode by storing the guest state in local storage
 * and redirecting the user to the summary page.
 */
function guestLogIn() {
  localStorage.setItem("guestMode", "true");
  window.location.href = "./summary.html?active=summary&user=guest";
}

/**
 * Logs into the user's account by retrieving input values and verifying credentials.
 */
function logIntoAccount() {
  let email = emailInput.value;
  let password = passwordInput.value;
  checkUserCredentials(email, password);
}

/**
 * Checks the user credentials against the stored users in the database.
 * 
 * If valid, it stores the user ID in localStorage and redirects to the summary page.
 * If invalid, it displays an error message.
 *
 * @param {string} email - The email provided by the user to check against the stored users.
 * @param {string} password - The password provided by the user to check against the stored users.
 */
function checkUserCredentials(email, password) {
  const errorMessage = document.getElementById("errorMsgCredentials");
  fetch(`${databaseUrl}/Data/Users.json`)
    .then((response) => response.json())
    .then((users) => {
      const user = Object.values(users).find(user => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem("userId", Object.keys(users).find(id => users[id] === user));
        window.location.href = "./summary.html?active=summary&user=loggedIn";
        passwordInput.style.border = "";
        errorMessage.innerHTML = "";
      } else {
        errorMessage.innerHTML = "Check your email and password. Please try again.";
      }
    });
}

document.addEventListener("DOMContentLoaded", checkUserSession);

emailInput.addEventListener("blur", function () {
  validateEmail();
  validateForm();
});

passwordInput.addEventListener("blur", function () {
  validateForm();
});

passwordInput.addEventListener("input", function () {
  updatePasswordIcon.call(passwordInput);
});

passwordToggle.addEventListener("click", toggleVisibility);
