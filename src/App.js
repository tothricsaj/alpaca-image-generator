import { useRef, useEffect } from 'react';
import './App.css';
import alpacaData from './data/alpacaData';

function App() {
  const canvasRef = useRef(null);
  let loadedImages = [];
  let loading = true;

  console.log(alpacaData);

  const draw = ctx => {
    return (imgSrc, x=0, y=0) => {
      const img = new Image();
      
      img.src = imgSrc;

      img.onload = function(){
        ctx.drawImage(img, x, y, 400, 400);
      };
    }
  }

  const loadAlpaca = loadedImages => {
    const imgSources = [
      '/alpaca/backgrounds/blue50.png',
      '/alpaca/ears/default.png',
      '/alpaca/hair/default.png',
      '/alpaca/neck/default.png',
      '/alpaca/eyes/angry.png',
      '/alpaca/nose.png',
      '/alpaca/mouth/default.png',
      '/alpaca/accessories/headphone.png',
    ];

    const promiseArr = imgSources.map(imgUrl => {
      const promise = new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
          loadedImages.push(img);
          resolve();
        }
        img.src = imgUrl;
      });
      return promise;
    });

    return promiseArr;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = 400;
    ctx.canvas.height = 400;

    Promise.all(loadAlpaca(loadedImages))
      .then(() => {
        console.log(loadedImages);
        loadedImages.forEach(img => {
          ctx.drawImage(img, 0, 0, 400, 400);
          loading = false;
          console.log(loading);
        });
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="App">
      <h2>Alpaca image generator</h2>

      <canvas
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default App;
