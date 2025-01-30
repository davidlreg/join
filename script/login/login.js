let errorMessage = document.querySelector(".errorMessage");
let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelector(".inputPassword");
let passwordToggle = document.querySelector(".passwordToggle")

/**
 * This function handles the removal of CSS animations from the logo elements
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
 * This function validates the log-in form fields and enables or disables the log in button based on the form's validity.
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
    logInButton.setAttribute("onclick", "location.href='./summary.html'");
  } else {
    logInButton.classList.remove("btnDark");
    logInButton.classList.add("btnUnabledDark");
    logInButton.removeAttribute("onclick");
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

emailInput.addEventListener("input", function () {
  validateEmail();
  validateForm();
});

passwordInput.addEventListener("input", function () {
  validateForm();
  updatePasswordIcon.call(passwordInput);
});

passwordToggle.addEventListener('click', toggleVisibility);