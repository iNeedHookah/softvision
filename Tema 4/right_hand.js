import Fingers from "./fingers.js";

export default class RightHand extends Fingers {
  constructor() {
    super();
  }

  updateLandmarks(landmarks) {
    super.updateLandmarks(landmarks, "right");
  }
}
