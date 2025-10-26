document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector("#hamburger");
  const menu = document.querySelector("#menu");
  const hLinks = document.querySelectorAll(".hLink a");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("hidden");
      hamburger.classList.toggle("open", !isOpen);
    });
  }

  // Close menu when any link is clicked (for mobile)
  if (hLinks.length && menu && hamburger) {
    hLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!menu.classList.contains("hidden")) {
          menu.classList.add("hidden");
          hamburger.classList.remove("open");
        }
      });
    });
  }
});
