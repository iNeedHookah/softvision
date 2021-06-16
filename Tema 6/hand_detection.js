import RightHand from "./right_hand.js";
import Sound from "./sound.js";

export default class HandDetection {
  init() {
    this.initializeElements();
    this.initializeHolistic();
    this.initializeCamera();
    this.rightHand = new RightHand();
    this.totalFingersRight = 0;
    this.rightHandFingersUp = [0, 0, 0, 0, 0];
    this.counter = document.getElementById("counter-container");
    this.previousFingers = 0;
  }

  initializeElements() {
    this.videoElement = document.getElementById("video-input");
    this.canvasElement = document.getElementById("canvas-output");
    this.canvasCtx = this.canvasElement.getContext("2d");
  }

  initializeHolistic() {
    this.holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });

    this.holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.holistic.onResults(this.onResults.bind(this));
  }

  initializeCamera() {
    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.holistic.send({ image: this.videoElement });
      },
      width: 780,
      height: 439,
    });
    camera.start();
  }

  onResults(results) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.canvasCtx.drawImage(
      results.image,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    if (results.rightHandLandmarks) {
      this.calculateRightHandFingers(results);
    }
    this.checkIfNoHands(results);
    this.counter.innerText = `Total fingers up: ${this.totalFingersRight}`;
    this.canvasCtx.restore();
  }

  calculateRightHandFingers(results) {
    this.rightHand.updateLandmarks(results.rightHandLandmarks);
    this.rightHand.draw(this.canvasCtx);
    this.rightHand.fingers.map((e, i) => {
      if (e === 1) {
        this.rightHandFingersUp[i] = 1;
      } else {
        this.rightHandFingersUp[i] = 0;
      }
    });
    this.totalFingersRight = this.rightHandFingersUp.reduce((a, b) => a + b, 0);
    this.playSound();
  }

  checkIfNoHands(results) {
    if (!results.rightHandLandmarks) {
      this.totalFingersRight = 0;
      this.previousFingers = 0;
      Sound.stop();
    }
  }

  playSound() {
    if (this.totalFingersRight !== this.previousFingers) {
      this.previousFingers = this.totalFingersRight;
      Sound.stop();
      Sound.play(this.previousFingers);
    }
  }
}
