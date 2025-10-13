class AutoTyping {
  constructor(selector, textArray, options = {}) {
    this.el = document.querySelector(selector);
    this.textArray = textArray;
    this.typeSpeed = options.typeSpeed || 100;
    this.deleteSpeed = options.deleteSpeed || 100;
    this.waitBeforeDelete = options.waitBeforeDelete || 2000;
    this.waitBetweenWords = options.waitBetweenWords || 500;
  }

  async start() {
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
      const interval = setInterval(() => {
        this.el.textContent += text[i];
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Initialize typing
const exampleText = ["Developer", "Designer", "Author"];
const exampleTyping = new AutoTyping("#text", exampleText, {
  typeSpeed: 100,
  deleteSpeed: 100,
  waitBeforeDelete: 2000,
  waitBetweenWords: 500,
});
exampleTyping.start();
