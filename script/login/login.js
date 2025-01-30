let errorMessage = document.querySelector(".errorMessage");
let emailInput = document.querySelector(".inputEmail");

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
    errorMessage.innerHTML = `Please enter a valid email address.`;
    errorMessage.style.display = "block";

  } else {
    emailInput.style.border = "";
    errorMessage.style.display = "none";
  }
}

emailInput.addEventListener("input", validateEmail);