import React, { useRef, useState, useEffect } from 'react';

const VoiceRecorder = ({ onTranscript, aiResponse }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
      };
    }
  }, [onTranscript]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  useEffect(() => {
    if (aiResponse) speak(aiResponse);
  }, [aiResponse]);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setListening(!listening);
  };

  return (
    <button onClick={toggleListening} className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow">
      {listening ? 'Stop' : 'Talk'}
    </button>
  );
};

export default VoiceRecorder;
