function init() {
  setActiveLinkFromURL();
}

function setActiveLinkFromURL() {
  const activeParam = getActiveParamFromURL();
  const navLinks = document.querySelectorAll(".nav-link");
  removeActiveClassFromAllLinks(navLinks);
  if (activeParam) {
    setActiveClassForLink(navLinks, activeParam);
  }
}

function getActiveParamFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("active");
}

function removeActiveClassFromAllLinks(links) {
  links.forEach((link) => link.classList.remove("active"));
}

function setActiveClassForLink(links, param) {
  links.forEach((link) => {
    if (new URL(link.href).searchParams.get("active") === param) {
      link.classList.add("active");
    }
  });
}

function openAddContactOverlay() {
  const overlayContainer = document.getElementById("overlayContainer");
  overlayContainer.innerHTML = showAddContactOverlay();
  addOverlayBackground(overlayContainer);
  const overlay = overlayContainer.querySelector(".addContactOverlay");
  openOverlay(overlay);
  addEventListenersToOverlay(overlay);
}

function addOverlayBackground(container) {
  container.classList.add("overlayBackground");
}

function openOverlay(overlay) {
  overlay.style.transition = "transform 0.3s ease-in-out";
  overlay.style.transform = "translateX(100%)";
  setTimeout(() => (overlay.style.transform = "translateX(0)"), 100);
}

function addEventListenersToOverlay(overlay) {
  const closeButton = overlay.querySelector(".closeButton");
  const cancelButton = overlay.querySelector(".cancelButton");
  closeButton.addEventListener("click", closeAddContactOverlay);
  cancelButton.addEventListener("click", closeAddContactOverlay);
}

function closeAddContactOverlay() {
  const overlay = document.querySelector(".addContactOverlay");
  closeOverlay(overlay);
  removeOverlayContent();
}

function closeOverlay(overlay) {
  overlay.style.transform = "translateX(100%)";
}

function removeOverlayContent() {
  setTimeout(() => {
    const overlayContainer = document.getElementById("overlayContainer");
    overlayContainer.innerHTML = "";
    overlayContainer.classList.remove("overlayBackground");
  }, 300);
}
