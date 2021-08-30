import { useRef, useEffect, useState } from 'react';
import './App.css';
import alpacaData from './data/alpacaData';

function Button(props) {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '5px',
        display: 'inline-block'
      }}
      onClick={props.setFeature}
    >
      {props.title}
    </div>
  )
}

function App() {
  const [imgSources, setImgSourses] = useState([
      '/alpaca/backgrounds/blue50.png',
      '/alpaca/ears/default.png',
      '/alpaca/hair/default.png',
      '/alpaca/neck/default.png',
      '/alpaca/eyes/angry.png',
      '/alpaca/nose.png',
      '/alpaca/mouth/default.png',
      '/alpaca/accessories/headphone.png',
    ]);
  const canvasRef = useRef(null);
  const alpacaImgTypes = Object.keys(alpacaData);

  let loadedImages = [];

  const setFeatures = (type, feature) => {
    let tmpArr = [...imgSources];

    console.log(type, feature);
    imgSources.forEach((imgPath, index) => {
      if(imgPath.includes(type)) {
        console.log(imgPath);
        tmpArr[index] = `/alpaca/${type}/${feature}`;

        setImgSourses(tmpArr);

        console.log(imgSources);
      }
    });
  }


  const featureButtons = () => {
    return alpacaImgTypes.map(type => {
      return (
        <div>
          <h3>{type}</h3>
          {alpacaData[type].map(
            btnName => (
            <Button
              title={btnName.substring(0,btnName.length - 4)}
              setFeature={() => setFeatures(type, btnName)}
            />
            )
          )}
        </div>
      )
    });
  }

  const loadAlpaca = loadedImages => {
    // const imgSources = [
    //   '/alpaca/backgrounds/blue50.png',
    //   '/alpaca/ears/default.png',
    //   '/alpaca/hair/default.png',
    //   '/alpaca/neck/default.png',
    //   '/alpaca/eyes/angry.png',
    //   '/alpaca/nose.png',
    //   '/alpaca/mouth/default.png',
    //   '/alpaca/accessories/headphone.png',
    // ];

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

      <div className="buttonsWrapper">
        { featureButtons() }
      </div>
    </div>
  );
}

export default App;
