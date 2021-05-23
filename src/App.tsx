import { useState } from 'react';
import Button from './components/Button';
import Cortana from './components/Cortana';
import GameScreen from './components/GameScreen';
import './App.css';

function App() {
  const [ready, setReady] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Cortana />
        </div>
        {ready ?  (
          <GameScreen />
        ) :
          (
            <>
              <p>Are you ready?</p>
              <Button color="primary" onClick={() => setReady(true)}>Ready</Button>
            </>
          )
        }
      </header>
    </div>
  );
}

export default App;
