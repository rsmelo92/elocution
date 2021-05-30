import { useEffect, useState } from 'react';
import randomWord from 'random-words';

import useRecognition from '../../hooks/useRecognition';
import Chip from '../Chip';

import styles from './styles.module.css';

const formatWord = (word: string) => 
  word.replace(/[^\w\s]/gi, '').replace(' ', '').toLocaleLowerCase();

const setBodyBG = (points:number) => 
  document.body.style.backgroundColor = `rgb(${51+points} ${55+points} ${56+points})`;

const setScore = (points:number) => {
  const highscore = localStorage.getItem('highscore');
  if (highscore) {
    const highscoreInt = parseInt(highscore, 10);

    if (highscoreInt > points) {
      localStorage.setItem('highscore', points.toString());
    }
  }
}

export default function GameScreen() {
  const [word, setWord] = useState('');
  const [answer, setAnwser] = useState('');
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [chipColor, setChipColor] = useState<'primary' | 'secondary' | undefined>();
  const recognition = useRecognition();

  const resetSound = new Audio(`${process.env.PUBLIC_URL}/reset.wav`);
  const errorSound = new Audio(`${process.env.PUBLIC_URL}/error.wav`);
  const successSound = new Audio(`${process.env.PUBLIC_URL}/success.wav`);

  useEffect(() => {
    setWord(randomWord());
  }, [points]);

  recognition.onresult = (event: any) => {
    const { transcript } = event.results[0][0];
    const formattedTranscript = formatWord(transcript);
    const formattedWord = formatWord(word);
    
    setAnwser(formattedTranscript);

    if(attempts === 0) {
      setAttempts(3);
      setAnwser('');
      resetSound.play();
      if (points === 0) {
        setWord(randomWord());
        return ;
      }
      setScore(points);
      setPoints(0);
      setBodyBG(0);
      return;
    }

    if (formattedTranscript === formattedWord) {
      setChipColor('primary');
      successSound.play();
      setPoints(points+10);
      setBodyBG(points);
      setAttempts(3);
      return;
    }

    setChipColor('secondary');
    errorSound.play();
    setAttempts(attempts-1);
  }

  return (
    <div>
      <h2>{points}</h2>
      <small>{attempts} attempts</small>
      <p>Word is {word}</p>
      {answer && (
        <div className={styles.chip}>
          <Chip color={chipColor}>
            {answer}
          </Chip>
        </div>
      )}
    </div>
  );
}
