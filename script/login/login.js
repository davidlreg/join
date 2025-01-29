const ErrorMessage = document.createElement("p");
  ErrorMessage.style.color = "red";
  ErrorMessage.style.fontSize = "10px";
  ErrorMessage.style.display = "none";

let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelectorAll(".inputPassword")[0];
let confirmPasswordInput = document.querySelectorAll(".inputPassword")[1];
let checkbox = document.querySelector("#checkbox");

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
  let logoContainer = document.getElementById('logoContainer');
  let logo = document.getElementById('logo');
  let logoMobile = document.getElementById('logoMobile');

  if (logoContainer) {
      logoContainer.addEventListener("animationend", () => {
          logoContainer.classList.remove('animationBackground');
          logo.classList.remove('animationLogo');        
          logoMobile.classList.remove('animationLogoMobile');
      });
  } else {
      console.error("Element #logoContainer not found!");
  }
};

emailInput.insertAdjacentElement("afterend", ErrorMessage);

/**
 * This function validates the email input field by checking if the entered value matches a typical email format.
 * If the email is invalid, it sets the input field's border to red
 * and displays an error message below the input field.
 * If the email is valid, it hides the error message.
 * 
 * The function is triggered when the user leaves the email input field (on "blur" event).
 * 
 * @example
 * Triggered when the user clicks out of the input field (blur event)
 * document.querySelector(".inputEmail").addEventListener("blur", validateEmail);
 * 
 * @returns {void}
 */
function validateEmail() {
  let emailValue = emailInput.value;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    emailInput.style.border = "1px solid red";
    ErrorMessage.textContent = "Please enter a valid email address.";
    ErrorMessage.style.display = "block";
  } else {
    emailInput.style.border = "";
    ErrorMessage.style.display = "none";
  }
}

emailInput.addEventListener("blur", validateEmail);

confirmPasswordInput.insertAdjacentElement("afterend", ErrorMessage);

/**
 * This function validates if the entered password and confirm password fields match.
 * If they don't match, it sets the confirm password input field's border to red
 * and displays an error message below the input field.
 * If they match, it hides the error message.
 *
 * @example
 * Triggered when the user clicks out of the confirm password field (blur event)
 * confirmPasswordInput.addEventListener("blur", validatePasswords);
 * 
 * @returns {void}
 */
function validatePasswords() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.style.border = "1px solid red";
    ErrorMessage.textContent = "Your passwords don't match. Please try again.";
    ErrorMessage.style.display = "block";
  } else {
    confirmPasswordInput.style.border = "";
    ErrorMessage.style.display = "none";
  }
}

confirmPasswordInput.addEventListener("blur", validatePasswords);

/**
 * This function validates the sign-up form fields and enables or disables the submit button based on the form's validity.
 * 
 * It checks if the email, password, and confirm password fields are filled out,
 * ensures that the email and confirm password fields do not have red borders (indicating an error)
 * and verifies that the checkbox is checked.
 * 
 * If all validation conditions are met, it enables the submit button by removing the 'btnUnabledDark' class
 * and adding the 'btnDark' class.
 * It sets the 'onclick' attribute of the submit button to trigger the 'signUpSuccessful()' function.
 * 
 * If any of the conditions are not met, it disables the submit button by removing the 'btnDark' class
 * and adding the 'btnUnabledDark' class.
 * It removes the 'onclick' attribute from the submit button.
 * 
 * Event listeners on the form inputs trigger this validation whenever any of these fields are modified by the user.
 * 
 * @returns {void}
 */
function validateForm() {
  let signUpButton = document.getElementById("signUpBtn");
  let isFormValid =
    emailInput.value !== "" &&
    passwordInput.value !== "" &&
    confirmPasswordInput.value !== "" &&
    emailInput.style.border !== "1px solid red" &&
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

emailInput.addEventListener("input", function () {
  validateEmail();
  validateForm();
});

passwordInput.addEventListener("input", function () {
  validatePasswords();
  validateForm();
});

confirmPasswordInput.addEventListener("input", function () {
  validatePasswords();
  validateForm();
});

checkbox.addEventListener("change", validateForm);