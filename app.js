// run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // ---------- NAV / THEME ----------
  const hamburger = document.querySelector("#hamburger");
  const menu = document.querySelector("#menu");
  const moon = document.querySelector("#moon");
  const hLinks = document.querySelectorAll(".hLink a"); // updated selector

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      hamburger.classList.toggle("bg-white");
    });
  }

  // ✅ Close mobile menu when any link is clicked
  if (hLinks.length) {
    hLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!menu.classList.contains("hidden")) {
          menu.classList.add("hidden");
          hamburger.classList.remove("bg-white");
        }
      });
    });
  }

  // ---------- DARK MODE ----------
  if (moon) {
    moon.innerHTML = document.documentElement.classList.contains("dark")
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';

    moon.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      moon.innerHTML = document.documentElement.classList.contains("dark")
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // ---------- TYPING EFFECT ----------
  class AutoTyping {
    constructor(selector, textArray, options = {}) {
      this.el = document.querySelector(selector);
      this.textArray = Array.isArray(textArray)
        ? textArray
        : [String(textArray)];
      this.typeSpeed = options.typeSpeed || 100;
      this.deleteSpeed = options.deleteSpeed || 80;
      this.waitBeforeDelete = options.waitBeforeDelete || 2000;
      this.waitBetweenWords = options.waitBetweenWords || 500;
      this.cursorClass = options.cursorClass || "typing-cursor";
    }

    async start() {
      if (!this.el) return;
      let index = 0;
      while (true) {
        await this.typeText(this.textArray[index]);
        await this.wait(this.waitBeforeDelete);
        await this.deleteText();
        await this.wait(this.waitBetweenWords);
        index = (index + 1) % this.textArray.length;
      }
    }

    typeText(text) {
      return new Promise((resolve) => {
        let i = 0;
        this.el.textContent = "";
        const interval = setInterval(() => {
          this.el.textContent += text[i] ?? "";
          i++;
          if (i === text.length) {
            clearInterval(interval);
            resolve();
          }
        }, this.typeSpeed);
      });
    }

    deleteText() {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          this.el.textContent = this.el.textContent.slice(0, -1);
          if (this.el.textContent.length === 0) {
            clearInterval(interval);
            resolve();
          }
        }, this.deleteSpeed);
      });
    }

    wait(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }
  }

  // Initialize typing effect if element exists
  const typingEl = document.querySelector("#text");
  if (typingEl) {
    if (
      !typingEl.nextElementSibling ||
      !typingEl.nextElementSibling.classList.contains("typing-cursor")
    ) {
      const cursor = document.createElement("span");
      cursor.className = "typing-cursor ml-1";
      cursor.innerText = "|";
      typingEl.insertAdjacentElement("afterend", cursor);
    }

    const exampleText = ["Developer", "Designer", "Author"];
    const exampleTyping = new AutoTyping("#text", exampleText, {
      typeSpeed: 100,
      deleteSpeed: 80,
      waitBeforeDelete: 2000,
      waitBetweenWords: 500,
    });
    exampleTyping.start();
  }
});

// Smooth scroll for in-page links (anchor tags)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    document.querySelector(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
