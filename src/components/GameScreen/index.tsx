import { useEffect, useState } from 'react';
import randomWord from 'random-words';

import useRecognition from '../../hooks/useRecognition';
import Chip from '../Chip';

const formatWord = (word: string) => word.replace(/[^\w\s]/gi, '').replace(' ', '').toLocaleLowerCase();

export default function GameScreen() {
  const [word, setWord] = useState('');
  const [answer, setAnwser] = useState('');
  const [chipColor, setChipColor] = useState<'primary' | 'secondary' | undefined>();
  const recognition = useRecognition();

  const errorSound = new Audio(`${process.env.PUBLIC_URL}/error.wav`);
  const successSound = new Audio(`${process.env.PUBLIC_URL}/success.wav`);

  useEffect(() => {
    setWord(randomWord());
  }, []);

  recognition.onresult = (event: any) => {
    const { transcript } = event.results[0][0];
    const formattedTranscript = formatWord(transcript);
    const formattedWord = formatWord(word);
    
    setAnwser(formattedTranscript);

    if (formattedTranscript === formattedWord) {
      setChipColor('primary');
      successSound.play();
    }
    else { 
      setChipColor('secondary');
      errorSound.play();
    }
  }


  return (
    <div>
      <p>
        Word is {word}
      </p>
      <Chip color={chipColor}>
        {answer}
      </Chip>
    </div>
  );
}
