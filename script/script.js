function init() {
  checkNavigationLinksColor();
}

function checkNavigationLinksColor() {
  // Wähle alle Links in der Navigation aus
  const navLinks = document.querySelectorAll(".nav-link");

  // Füge Event-Listener zu jedem Link hinzu
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Entferne die Klasse 'active' von allen Links
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Füge die Klasse 'active' nur dem geklickten Link hinzu
      this.classList.add("active");
    });
  });
}
