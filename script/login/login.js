const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

let errorMessage = document.querySelector(".errorMessage");
let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelector(".inputPassword");
let passwordToggle = document.querySelector(".passwordToggle")

document.addEventListener("DOMContentLoaded", function() {
  const userId = localStorage.getItem("userId");

  if (userId) {
    window.location.href = "./summary.html?active=summary&user=loggedIn";
  }
});


/**
 * Handles the removal of CSS animations from the logo elements
 * after the animation has completed.
 *
 * It listens for the "animationend" event on the #logoContainer element, 
 * and when the animation ends, it removes the animation classes from the container 
 * and logo elements (both desktop and mobile versions).
 *
 * If the #logoContainer element is not found in the DOM, an error is logged to the console.
 * 
 * @returns {void}
 */
function removeJoinAnimation () {
  let logoContainer = document.getElementById("logoContainer");
  let logo = document.getElementById("logo");
  let logoMobile = document.getElementById("logoMobile");

  if (logoContainer) {
      logoContainer.addEventListener("animationend", () => {
          logoContainer.classList.remove("animationBackground");
          logo.classList.remove("animationLogo");        
          logoMobile.classList.remove("animationLogoMobile");
      });
  } else {
      console.error("Element #logoContainer not found!");
  }
};

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
  localStorage.setItem("email", emailValue);
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
  let isFormValid =
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
 * Logs into the user's account by retrieving input values and verifying credentials.
 */
function logIntoAccount() {
  let email = emailInput.value;
  let password = passwordInput.value;
  checkUserCredentials(email, password);
}

/**
 * Checks the user credentials against the database.
 * 
 * @param {string} email - The email input provided by the user.
 * @param {string} password - The password input provided by the user.
 */
function checkUserCredentials(email, password) {
  let usersRef = database.ref('Data/Users');
  let userFound = false;

  usersRef.once('value', snapshot => {
    snapshot.forEach(userSnapshot => {
      if (processUserSnapshot(userSnapshot, email, password)) {
        userFound = true;
        return;
      }
    });
    if (!userFound) displayError("There is no account with this email.");
  });
}

/**
 * Processes a user snapshot and checks if the email and password match.
 * 
 * @param {Object} userSnapshot - The snapshot of the user data from the database.
 * @param {string} email - The email input provided by the user.
 * @param {string} password - The password input provided by the user.
 * @returns {boolean} - Returns true if the user is found and processed, otherwise false.
 */
function processUserSnapshot(userSnapshot, email, password) {
  const user = userSnapshot.val();
  const userId = userSnapshot.key;
  if (user.email === email) {
    if (user.password === password) {
      localStorage.setItem("userId", userId);
      window.location.href = "./summary.html?active=summary&user=loggedIn";
    } else {
      displayError("Your password is incorrect. Please try again.");
    }
    return true;
  }
  return false;
}

/**
 * Displays an error message to the user.
 * 
 * @param {string} message - The error message to be displayed.
 */
function displayError(message) {
  errorMessage.innerHTML = message;
  errorMessage.style.display = "block";
}

emailInput.addEventListener("input", function () {
  validateEmail();
  validateForm();
});

passwordInput.addEventListener("input", function () {
  validateForm();
  updatePasswordIcon.call(passwordInput);
});

passwordToggle.addEventListener('click', toggleVisibility);