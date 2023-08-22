let randomColor = () => {
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);

  let sum = r + g + b;
  if(sum / 3 < 80) {
    if(r <= 205) {
        r += 50;
    }
    if(g <= 205) {
        g += 50;
    }
    if(b <= 205) {
        b += 50;
    }
    
    
  }

  return `rgb(${r},${g},${b})`;
};

export default randomColor;
