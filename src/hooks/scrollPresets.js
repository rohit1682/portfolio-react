const PROPS = ["opacity", "x", "y", "z", "scale", "scaleX", "scaleY", "rotateX", "rotateY"];

const identity = (prop) => {
  if (prop === "opacity" || prop === "scale" || prop === "scaleX" || prop === "scaleY")
    return { input: [0, 1], output: [1, 1] };
  return { input: [0, 1], output: [0, 0] };
};

const presets = {
  zoomFade: {
    opacity:  { input: [0, 0.1, 0.18, 0.82, 0.9, 1], output: [0, 0.6, 1, 1, 0.6, 0] },
    y:        { input: [0, 0.1, 0.18, 0.82, 0.9, 1], output: [60, 18, 0, 0, -18, -60] },
    scale:    { input: [0, 0.1, 0.18, 0.82, 0.9, 1], output: [0.88, 0.96, 1, 1, 0.96, 0.88] },
  },

  perspectiveRise: {
    opacity:  { input: [0, 0.08, 0.18, 0.82, 0.92, 1], output: [0, 0.5, 1, 1, 0.5, 0] },
    y:        { input: [0, 0.08, 0.18, 0.82, 0.92, 1], output: [70, 18, 0, 0, -12, -50] },
    scale:    { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [0.92, 0.97, 1, 1, 0.97, 0.92] },
    rotateX:  { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [8, 2, 0, 0, -1, -5] },
  },

  slideLeft: {
    opacity:  { input: [0, 0.1, 0.18, 0.82, 0.9, 1], output: [0, 0.6, 1, 1, 0.6, 0] },
    x:        { input: [0, 0.1, 0.18, 0.82, 0.9, 1], output: [120, 24, 0, 0, -24, -120] },
    rotateY:  { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [-5, -1, 0, 0, 1, 4] },
  },

  slideRight: {
    opacity:  { input: [0, 0.1, 0.18, 0.82, 0.9, 1], output: [0, 0.6, 1, 1, 0.6, 0] },
    x:        { input: [0, 0.1, 0.18, 0.82, 0.9, 1], output: [-120, -24, 0, 0, 24, 120] },
    rotateY:  { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [5, 1, 0, 0, -1, -4] },
  },

  superZoom: {
    opacity:  { input: [0, 0.08, 0.18, 0.82, 0.92, 1], output: [0, 0.5, 1, 1, 0.5, 0] },
    scale:    { input: [0, 0.08, 0.18, 0.82, 0.92, 1], output: [0.7, 0.9, 1, 1, 1.08, 1.2] },
    y:        { input: [0, 0.08, 0.18, 0.82, 0.92, 1], output: [50, 12, 0, 0, -6, -25] },
  },

  flipIn: {
    opacity:  { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [0, 0.5, 1, 1, 0.5, 0] },
    rotateX:  { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [15, 3, 0, 0, -2, -9] },
    y:        { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [50, 12, 0, 0, -9, -36] },
    z:        { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [-120, -30, 0, 0, -18, -60] },
    scale:    { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [0.9, 0.97, 1, 1, 0.97, 0.9] },
  },

  curtainDrop: {
    opacity:  { input: [0, 0.08, 0.18, 0.82, 0.92, 1], output: [0, 0.5, 1, 1, 0.5, 0] },
    y:        { input: [0, 0.08, 0.18, 0.82, 0.92, 1], output: [-90, -18, 0, 0, 18, 70] },
    scaleX:   { input: [0, 0.1, 0.2, 0.8, 0.9, 1], output: [0.9, 0.97, 1, 1, 0.97, 0.9] },
    rotateX:  { input: [0, 0.1, 0.2], output: [-4, -1, 0] },
  },
};

function getMobilePreset(preset) {
  const mobile = {};
  for (const [prop, val] of Object.entries(preset)) {
    if (prop === "rotateX" || prop === "rotateY" || prop === "z") continue;
    if (prop === "x" || prop === "y") {
      mobile[prop] = {
        input: val.input,
        output: val.output.map((v) => Math.round(v * 0.5)),
      };
    } else if (prop === "scale" || prop === "scaleX" || prop === "scaleY") {
      mobile[prop] = {
        input: val.input,
        output: val.output.map((v) => 1 + (v - 1) * 0.5),
      };
    } else {
      mobile[prop] = val;
    }
  }
  return mobile;
}

export { presets, getMobilePreset, identity, PROPS };
