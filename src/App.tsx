import { useState } from 'react';
import Button from './components/Button';
import Cortana from './components/Cortana';
import GameScreen from './components/GameScreen';
import styles from './styles.module.css';

function App() {
  const [ready, setReady] = useState(false);
  const score = localStorage.getItem('highscore');
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div>
          <Cortana />
        </div>
        {ready ?  (
          <GameScreen />
        ) :
          (
            <>
              <p>Are you ready?</p>
              <p className={styles.score}>Your highscore is {score || 0}</p>
              <Button color="primary" onClick={() => setReady(true)}>Ready</Button>
            </>
          )
        }
      </header>
    </div>
  );
}

export default App;
