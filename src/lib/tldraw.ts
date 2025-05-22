export const randomGeo = () => {
  const options = ["rectangle", "ellipse", "triangle", "diamond", "star"];
  return options[Math.floor(Math.random() * options.length)];
};

export const randomSize = () => 50 + Math.floor(Math.random() * 150);

export const randomProps = () => {
  return {
    geo: randomGeo(),
    w: randomSize(),
    h: randomSize(),
  };
};
