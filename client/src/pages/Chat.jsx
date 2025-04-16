import React, { useState } from 'react';
import ChatLayout from '../components/ChatLayout';
import ChatMessage from '../components/ChatMessage';
import VoiceRecorder from '../components/VoiceRecorder';
import { useAuth } from '../contexts/AuthContext';
import PhaseSelector from '../components/PhaseSelector'; // at the top


const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [phase, setPhase] = useState('onboarding'); // new state


  const sendToAI = async (text) => {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, userId: user._id, phase })
    });
    const data = await res.json();
    const newMessages = [...messages, { sender: 'user', text }, { sender: 'ai', text: data.response }];
    setMessages(newMessages);
  };
  

  return (
    <ChatLayout>
      <h2 className="text-2xl font-bold">Hi {user?.email} 👋</h2>
      <div className="space-y-3">
        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {/* <div className="space-y-3 max-h-[60vh] overflow-y-auto"> */}

      <div className="pt-4">
      <PhaseSelector phase={phase} setPhase={setPhase} />

      <VoiceRecorder
        onTranscript={(text) => sendToAI(text)}
        aiResponse={messages[messages.length - 1]?.sender === 'ai' ? messages[messages.length - 1]?.text : ''}
      />

      </div>
    </ChatLayout>
  );
};

export default Chat;
