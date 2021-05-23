import { useEffect, useState } from 'react';
import randomWord from 'random-words';
import './App.css';

declare const window: any;

const formatWord = (word: string) => word.replace(/[^\w\s]/gi, '').replace(' ', '').toLocaleLowerCase();

type Recognition = {
  start: () => void,
  onresult: (event:any) => void,
}

const setRecognition = (): Recognition => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;
  return recognition;
};

function App() {
  const [ready, setReady] = useState(false);
  const [word, setWord] = useState('');
  const [answer, setAnwser] = useState('');
  const errorSound = new Audio(`${process.env.PUBLIC_URL}/error.wav`);
  const successSound = new Audio(`${process.env.PUBLIC_URL}/success.wav`);

  useEffect(() => {
    setWord(randomWord());
    (async () => {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
    })();
  }, []);

  const recognition = setRecognition();
  recognition.start();

  recognition.onresult = (event) => {
    const { transcript } = event.results[0][0];
    const element = document.getElementById("answer");
    if (element) {
      if (formatWord(transcript) === formatWord(word)) {
        setAnwser(transcript);
        element.style.backgroundColor = "green";
        successSound.play();
      }
      else { 
        setAnwser(transcript);
        element.style.backgroundColor = "red";
        errorSound.play();
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {ready ?  (
          <>
            <p>
              Word is {word}
            </p>
            <p id="answer">
              {answer}
            </p>
          </>
        ) :
          (
            <>
              <p>Are you ready?</p>
              <button onClick={() => setReady(true)}>Ready!</button>
            </>
          )
        }
      </header>
    </div>
  );
}

export default App;
