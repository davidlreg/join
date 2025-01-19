// removes animated logo and background when the animation is over
document.addEventListener("DOMContentLoaded", () => {
    let logoContainer = document.getElementById('logoContainer');
    let logo = document.getElementById('logo');

    logoContainer.addEventListener("animationend", () => {
        logoContainer.classList.remove('animationBackground');
        logo.classList.remove('animationLogo');
      });
});
