/**
 * Plays the animation if it hasn't been played before, otherwise skips it.
 */
function checkJoinAnimation() {
  let logoContainer = document.getElementById("logoContainer");

  if (!hasAnimationPlayed()) {
    if (logoContainer) {
      logoContainer.addEventListener("animationend", onAnimationEnd);
    } else {
      console.error("Element #logoContainer not found!");
    }
  } else {
    removeAnimationClasses();
  }
} 

/**
 * Checks if the animation has been played before by the user.
 * @returns {boolean} True if animation was played, false otherwise.
 */
function hasAnimationPlayed() {
    return localStorage.getItem("animationPlayed") === "true";
}

/**
 * Removes animation classes from logo-related elements.
 */
function removeAnimationClasses() {
  let logoContainer = document.getElementById("logoContainer");
  let logo = document.getElementById("logo");
  let logoMobile = document.getElementById("logoMobile");

  if (logoContainer) {
    logoContainer.classList.remove("animationBackground");
  }

  if (logo) {
    logo.classList.remove("animationLogo");
  }

  if (logoMobile) {
    logoMobile.classList.remove("animationLogoMobile");
  }
}

/**
 * Sets the animation as played in localStorage.
 */
function setAnimationPlayed() {
  localStorage.setItem("animationPlayed", "true");
}

/**
 * Handles the end of the animation and updates the state.
 */
function onAnimationEnd() {
  removeAnimationClasses();
  setAnimationPlayed();
}