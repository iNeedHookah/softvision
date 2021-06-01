import HandDetection from "./hand_detection.js";
import LeftHand from "./left_hand.js";
import RightHand from "./right_hand.js";

export default class App {
  init() {
    this.initializeMediaPipe();
  }

  initializeMediaPipe() {
    const handDetection = new HandDetection();
    handDetection.init();
  }
}
