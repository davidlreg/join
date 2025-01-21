function init() {
  setActiveLinkFromURL();
}

function setActiveLinkFromURL() {
  const navLinks = document.querySelectorAll(".nav-link");
  const urlParams = new URLSearchParams(window.location.search);
  const activeParam = urlParams.get("active");

  if (activeParam) {
    navLinks.forEach((link) => {
      if (new URL(link.href).searchParams.get("active") === activeParam) {
        link.classList.add("active");
      }
    });
  }
}

function openAddContactOverlay() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showAddContactOverlay();
  overlayContainer.classList.add("overlayBackground");
  const overlay = overlayContainer.querySelector(".addContactOverlay");
  overlay.style.transform = "translateX(100%)";

  setTimeout(() => {
    overlay.style.transform = "translateX(0)";
  }, 100);

  const closeButton = overlay.querySelector(".closeButton");
  closeButton.addEventListener("click", closeAddContactOverlay);
}

function closeAddContactOverlay() {
  const overlay = document.querySelector(".addContactOverlay");
  overlay.style.transform = "translateX(100%)";

  setTimeout(() => {
    const overlayContainer = document.getElementById("overlayContainer");
    overlayContainer.innerHTML = "";
  }, 300);
}

