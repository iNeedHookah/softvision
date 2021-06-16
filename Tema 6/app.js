import HandDetection from "./hand_detection.js";

export default class App {
  init() {
    this.initializeMediaPipe();
  }

  initializeMediaPipe() {
    const handDetection = new HandDetection();
    handDetection.init();
  }
}
