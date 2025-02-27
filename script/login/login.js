let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelector(".inputPassword");
let passwordToggle = document.querySelector(".passwordToggle");

const databaseUrl = "https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Redirects the user to the summary page if they are logged in or in guest mode.
 *
 * @returns {void}
 */
function checkUserSession() {
  let user = localStorage.getItem("userId");
  let guest = localStorage.getItem("guestMode");

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
 * Validates the log-in form fields and updates the log in button state.
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
 * @this {HTMLInputElement}
 * @returns {void}
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
 * @returns {void}
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
  let email = emailInput.value;
  let password = passwordInput.value;
  checkUserCredentials(email, password);
}

/**
 * Checks the user credentials against the stored users in the database.
 *
 * @param {string} email - The email provided by the user.
 * @param {string} password - The password provided by the user.
 * @returns {void}
 */
function checkUserCredentials(email, password) {
  const errorMessage = document.getElementById("errorMsgCredentials");
  fetch(`${databaseUrl}/Data/Users.json`)
    .then((response) => response.json())
    .then((users) => {
      const user = Object.values(users).find((user) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem(
          "userId",
          Object.keys(users).find((id) => users[id] === user)
        );
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
