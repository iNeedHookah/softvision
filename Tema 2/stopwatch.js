class Stopwatch {
  constructor() {
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.timer = document.getElementById("timer-container");
    this.time;

    document.getElementById("start-time-btn").addEventListener("click", () => {
      this.startTimer();
    });

    document.getElementById("pause-time-btn").addEventListener("click", () => {
      clearInterval(this.time);
    });

    document.getElementById("reset-time-btn").addEventListener("click", () => {
      this.resetTime();
      this.formatTimer();
    });
  }

  startTimer() {
    this.time = setInterval(() => {
      this.updateTimer();
    }, 10);
  }

  #calculateTime() {
    this.miliseconds += 10;
    if (this.miliseconds === 1000) {
      this.miliseconds = 0;
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }
  }

  formatTimer() {
    let h = this.hours < 10 ? "0" + this.hours : this.hours;
    let m = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    let s = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    let ms = this.miliseconds < 10 ? "00" + this.miliseconds : this.miliseconds;
    this.timer.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
  }

  updateTimer() {
    this.#calculateTime();
    this.formatTimer();
  }

  clear() {
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  resetTime() {
    clearInterval(this.time);
    this.clear();
  }
}

new Stopwatch();
