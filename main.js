class Word {
  constructor(text, container) {
    this.container = document.querySelector(container);
    this.text = text;
    this.x;
    this.y;
    this.size;
    this.rotate;
    this.lifeTime;
    this.createElement();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  setParameters() {
    this.x = this.getRandomInt(15, this.container.offsetWidth);
    this.y = this.getRandomInt(15, this.container.offsetHeight);
    this.size = this.getRandomInt(15, 28);
    this.rotate = this.getRandomInt(0, 180);
    this.lifeTime = this.getRandomInt(4, 7) * 1000;
  }

  animation(element, duration) {
    function minus() {
      return Math.round(Math.random() * 1) ? "" : "-";
    }

    const wordAnimation = [
      { transform: "translate(0,0)" },
      {
        transform: `translate(${minus()}10px,${minus()}10px) rotate(${minus()}${this.getRandomInt(
          10,
          100
        )}deg)`,
        opacity: 0,
      },
    ];
    const wordTiming = { duration: duration, iterations: 1 };
    element.animate(wordAnimation, wordTiming);
  }

  createElement = () => {
    this.setParameters();
    const word = document.createElement("span");
    word.dataset.index = 0;
    word.classList.add("rainWord");
    word.style.cssText += `
    position:absolute;
    top:${this.y}px;
    left:${this.x}px;
    font-size:${this.size}px;
    transform:rotate(${this.rotate}deg)
    `;
    word.innerText = this.text;
    this.container.appendChild(word);
    this.animation(word, this.lifeTime);
    setTimeout(() => {
      word.remove();
      this.createElement();
    }, this.lifeTime);
  };
}

class Rain {
  constructor(container) {
    this.container = container;
    this.words = [
      "przyszłość",
      "słowa",
      "kreatywność",
      "pomysłowość",
      "informatyka",
      "programowanie",
      "abstrakcja",
    ];
    this.elements = [];
    this.addWords();
  }
  addWords = () => {
    this.words.forEach(
      function (e) {
        this.elements.push(new Word(e, this.container));
      }.bind(this)
    );
  };
}

const rain = new Rain(".rainingSpace");
