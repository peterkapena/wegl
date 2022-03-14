const colours = (sides) => {
  const twoColours = [];
  for (let index = 1; index < sides + 1; index++) {
    for (let i = 0; i < 4; i++) {
      twoColours.push(Math.round(Math.random()));
    }
  }
  return new Float32Array(twoColours);
};
