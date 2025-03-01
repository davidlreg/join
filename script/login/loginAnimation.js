/**
 * Initializes the animation if it hasn't been played before.
 *
 */
function initializeJoinAnimation() {
  const logoContainer = document.getElementById("logoContainer");

  if (!hasAnimationPlayed()) {
    addAnimationClasses();
    if (logoContainer) {
      logoContainer.addEventListener("animationend", onAnimationEnd);
    } else {
      console.error("Element #logoContainer not found!");
    }
  }
}

/**
 * Checks if the animation has been played before by the user.
 *
 * @returns {boolean} True if animation was played, false otherwise.
 */
function hasAnimationPlayed() {
  return localStorage.getItem("animationPlayed") === "true";
}

/**
 * Adds animation classes to elements to trigger the animation.
 *
 */
function addAnimationClasses() {
  const logoContainer = document.getElementById("logoContainer");
  const logo = document.getElementById("logo");
  const logoMobile = document.getElementById("logoMobile");

  if (logoContainer) {
    logoContainer.classList.add("animationBackground");
  }
  if (logo) {
    logo.classList.add("animationLogo");
  }
  if (logoMobile) {
    logoMobile.classList.add("animationLogoMobile");
  }
}

/**
 * Removes animation classes from elements.
 *
 */
function removeAnimationClasses() {
  const logoContainer = document.getElementById("logoContainer");
  const logo = document.getElementById("logo");
  const logoMobile = document.getElementById("logoMobile");

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
 * Handles the animation end event and updates state.
 *
 */
function onAnimationEnd() {
  removeAnimationClasses();
  localStorage.setItem("animationPlayed", "true");
}
