import { useEffect, useState } from 'react';
import randomWord from 'random-words';

import useRecognition from '../../hooks/useRecognition';
import Chip from '../Chip';

const formatWord = (word: string) => word.replace(/[^\w\s]/gi, '').replace(' ', '').toLocaleLowerCase();

export default function GameScreen() {
  const [time, setTime] = useState(3);
  const [points, setPoints] = useState(0);
  const [word, setWord] = useState('');
  const [answer, setAnwser] = useState('');
  const [chipColor, setChipColor] = useState<'primary' | 'secondary' | undefined>();
  const recognition = useRecognition();

  const errorSound = new Audio(`${process.env.PUBLIC_URL}/error.wav`);
  const successSound = new Audio(`${process.env.PUBLIC_URL}/success.wav`);

  useEffect(
    () => {
        if (time <= 0) return;
        const id = setInterval(() => setTime(time - 1), 1000);
        return () => clearInterval(id);
    },
    [time]
  );

  useEffect(() => {
    setWord(randomWord());
  }, [points]);

  recognition.onresult = (event: any) => {
    const { transcript } = event.results[0][0];
    const formattedTranscript = formatWord(transcript);
    const formattedWord = formatWord(word);
    
    setAnwser(formattedTranscript);

    if (formattedTranscript === formattedWord) {
      setChipColor('primary');
      successSound.play();
      setPoints(points+10);
    }
    else { 
      setChipColor('secondary');
      errorSound.play();
    }
  }

  recognition.onend = () => {
    recognition.start();
  }

  return (
    <div>
      <p>Timer: {time}</p>
      <h2>Points {points}</h2>
      <p>Word is {word}</p>
      <Chip color={chipColor}>
        {answer}
      </Chip>
    </div>
  );
}
