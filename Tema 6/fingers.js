export default class Fingers {
  constructor() {
    this.fingers = [0, 0, 0, 0, 0];
  }

  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
    this.indexFinger = landmarks && landmarks[8];
    this.indexFingerMCP = landmarks && landmarks[5];
    this.thumbFinger = landmarks && landmarks[4];
    this.thumbFingerIP = landmarks && landmarks[3];
    this.middleFinger = landmarks && landmarks[12];
    this.middleFingerMCP = landmarks && landmarks[9];
    this.ringFinger = landmarks && landmarks[16];
    this.ringFingerMCP = landmarks && landmarks[13];
    this.pinky = landmarks && landmarks[20];
    this.pinkyMCP = landmarks && landmarks[17];

    this.indexFingerUp();
    this.middleFingerUp();
    this.ringFingerUp();
    this.pinkyFingerUp();
    this.thumbFingerUp();
  }

  draw(ctx) {
    drawConnectors(ctx, this.landmarks, HAND_CONNECTIONS, {
      color: "white",
      lineWidth: 5,
    });
    drawLandmarks(ctx, this.landmarks, {
      color: "black",
      lineWidth: 2,
    });
  }

  indexFingerUp() {
    if (this.indexFinger.y < this.indexFingerMCP.y) {
      if (this.fingers[1] !== 1) this.fingers[1] = 1;
    } else {
      if (this.fingers[1] !== 0) this.fingers[1] = 0;
    }
  }

  middleFingerUp() {
    if (this.middleFinger.y < this.middleFingerMCP.y) {
      if (this.fingers[2] !== 1) this.fingers[2] = 1;
    } else {
      if (this.fingers[2] !== 0) this.fingers[2] = 0;
    }
  }

  ringFingerUp() {
    if (this.ringFinger.y < this.ringFingerMCP.y) {
      if (this.fingers[3] !== 1) this.fingers[3] = 1;
    } else {
      if (this.fingers[3] !== 0) this.fingers[3] = 0;
    }
  }

  pinkyFingerUp() {
    if (this.pinky.y < this.pinkyMCP.y) {
      if (this.fingers[4] !== 1) this.fingers[4] = 1;
    } else {
      if (this.fingers[4] !== 0) this.fingers[4] = 0;
    }
  }

  thumbFingerUp() {
    if (this.thumbFinger.x > this.thumbFingerIP.x) {
      if (this.fingers[0] !== 1) this.fingers[0] = 1;
    } else {
      if (this.fingers[0] !== 0) this.fingers[0] = 0;
    }
  }
}
