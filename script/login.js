// removes animated logos and background when the animation is over
document.addEventListener("DOMContentLoaded", () => {
    let logoContainer = document.getElementById('logoContainer');
    let logo = document.getElementById('logo');
    let logoMobile = document.getElementById('logoMobile');

    logoContainer.addEventListener("animationend", () => {
        logoContainer.classList.remove('animationBackground');
        logo.classList.remove('animationLogo');        
        logoMobile.classList.remove('animationLogoMobile');
      });
});