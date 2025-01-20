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
        nk.classList.add("active");
      }
    });
  }
}
