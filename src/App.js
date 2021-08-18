import { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  const draw = ctx => {
    return (imgSrc, x=0, y=0) => {
      

      const img = new Image();
      
      img.src = imgSrc;

      img.onload = function(){
        ctx.drawImage(img, x, y, 400, 400);
      };
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = 400;
    ctx.canvas.height = 400;

    // ctx.fillRect(0, 0, 720, 720);

    const drawToCanvas = draw(ctx);

    drawToCanvas('/alpaca/backgrounds/blue50.png');

    drawToCanvas('/alpaca/ears/default.png');
    drawToCanvas('/alpaca/hair/default.png');

    drawToCanvas('/alpaca/neck/default.png');
    drawToCanvas('/alpaca/eyes/angry.png');

    drawToCanvas('/alpaca/nose.png');   
    drawToCanvas('/alpaca/mouth/default.png');

    drawToCanvas('/alpaca/leg/default.png');
    drawToCanvas('/alpaca/accessories/headphone.png');
  });

  return (
    <div className="App">
      <h2>Alpaca image generator</h2>

      <canvas
        ref={canvasRef}
      ></canvas>

      {/* <img src="/alpaca/ears/default.png" alt="" /> */}
    </div>
  );
}

export default App;
