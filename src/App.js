import AltitudeGet from './components/AltitudeGet.js';
import AltitudeVisu from './components/AltitudeVisu.js';
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';


function App() {
  
  const [data, setData] = useState({altitude:0,his:0,adi:0});

  const [mode, setMode] = useState('text');

  useEffect(() => {
    const poll = (lastUpdateTime) => {
      fetch(`http://127.0.0.1:3000/poll?lastUpdateTime=${lastUpdateTime}`)
        .then((res) => res.json())
        .then((newData) => {
          setData(newData);
          poll(newData.updateTime);
        });
    };

    poll(0);
  }, []);


  return (
    <div className="App">
      <div>
      <button onClick={() => setMode('text')}>Text</button>
      <button onClick={() => setMode('visual')}>Visual</button>
      <div>
        {mode === 'text' && (
          <AltitudeGet altitude={data.altitude} his={data.his} adi={data.adi}/>
          
        )}
        {mode === 'visual' && (
        <AltitudeVisu  altitude={data.altitude} his={data.his} adi={data.adi}/>
        )}
      </div>
    </div>
    </div>
  );
}


export default App;
