import { useEffect } from 'react';

declare const window: any;

export default function useRecognition() {
  useEffect(() => {
    (async () => {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
    })();
  }, []);  

  const setRecognition = () => {
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

  const recognition = setRecognition();
  recognition.start();
  
  return recognition;
}
