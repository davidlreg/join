const ErrorMessage = document.createElement("p");
ErrorMessage.style.color = "red";
ErrorMessage.style.fontSize = "10px";
ErrorMessage.style.display = "none";

let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelectorAll(".inputPassword")[0];
let confirmPasswordInput = document.querySelectorAll(".inputPassword")[1];

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
emailInput.insertAdjacentElement("afterend", ErrorMessage);

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

/**
 * This function validates if the entered password and confirm password fields match.
 * If they don't match, it sets the confirm password input field's border to red
 * and displays an error message below the input field.
 * If they match, it hides the error message.
 *
 * @example
 * Triggered when the user clicks out of the confirm password field (blur event)
 * confirmPasswordInput.addEventListener("blur", validatePasswords);
 */

confirmPasswordInput.insertAdjacentElement("afterend", ErrorMessage);

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