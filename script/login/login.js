let errorMessage = document.querySelector(".errorMessage");
let emailInput = document.querySelector(".inputEmail");
let passwordInput = document.querySelector(".inputPassword");

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

emailInput.addEventListener("input", validateForm);

passwordInput.addEventListener("input", validateForm);