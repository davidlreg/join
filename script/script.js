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

  // Overlay-HTML aus der Funktion einfügen
  overlayContainer.innerHTML = showAddContactOverlay();

  // Hintergrund und Overlay initialisieren
  overlayContainer.classList.add("overlayBackground");
  const overlay = overlayContainer.querySelector(".addContactOverlay");
  overlay.style.transform = "translateX(100%)"; // Start außerhalb des Bildschirms

  // Animation starten (nach einem Frame für Transition-Effekt)
  setTimeout(() => {
    overlay.style.transform = "translateX(0)";
  }, 10);

  // Close-Funktion hinzufügen
  const closeButton = overlay.querySelector(".closeButton");
  closeButton.addEventListener("click", closeAddContactOverlay);
}

function closeAddContactOverlay() {
  const overlay = document.querySelector(".addContactOverlay");
  overlay.style.transform = "translateX(100%)"; // Rückwärtsanimation

  setTimeout(() => {
    const overlayContainer = document.getElementById("overlayContainer");
    overlayContainer.innerHTML = ""; // Entfernt Overlay nach Animation
  }, 300); // Timeout entspricht der Dauer der Transition
}
