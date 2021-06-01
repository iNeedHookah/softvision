import Fingers from "./fingers.js";

export default class LeftHand extends Fingers {
  constructor() {
    super();
  }

  updateLandmarks(landmarks) {
    super.updateLandmarks(landmarks, "left");
  }
}
