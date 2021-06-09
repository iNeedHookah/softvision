export class Grid {
  constructor(options) {
    this.rootId = options.rootId;
    this.answersContainer = document.getElementById(this.rootId);
    this.answers = [];
    this.synth = new Tone.MonoSynth({
      oscillator: {
        type: "square",
      },
    }).toDestination();
  }

  init() {
    this.draw();
  }

  draw() {
    this.generateAnswer("September 1, 1996", false);
    this.generateAnswer("December 4, 1995", true);
    this.generateAnswer("August 25, 1995", false);
  }

  generateAnswer(text, correctAnswer) {
    const answer = document.createElement("div");
    answer.innerText = text;
    answer.classList.add("answer");
    if (correctAnswer) {
      answer.classList.add("correct-answer");
    }
    answer.addEventListener("click", () => {
      this.toggleCellState(answer);
    });
    this.answersContainer.append(answer);
    this.answers.push(answer);
  }

  toggleCellState(cell) {
    let classToAdd = "wrong";
    if (cell.classList.contains("correct-answer")) {
      this.synth.triggerAttackRelease("C5", "8n");
      classToAdd = "correct";
    } else {
      this.synth.triggerAttackRelease("C2", "8n");
    }

    cell.classList.add(classToAdd);

    setTimeout(() => {
      cell.classList.remove(classToAdd);
    }, 500);
  }
}
