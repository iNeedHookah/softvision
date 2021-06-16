class Sound {
  static type = "square";
  static synth = new Tone.MonoSynth({
    oscillator: {
      type: this.type,
    },
  }).toDestination();

  static play(frequency) {
    new Tone.Loop(() => {
      this.synth.triggerAttackRelease("C4", "8n");
    }, frequency).start(0);

    Tone.Transport.start();
  }

  static stop() {
    Tone.Transport.cancel();
  }
}

export default Sound;
