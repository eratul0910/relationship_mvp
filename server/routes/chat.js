const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

const fakeEmotions = ['happy', 'sad', 'angry', 'confused', 'hopeful'];
const fakeReplies = [
  "Thanks for sharing that. It sounds important to you.",
  "I appreciate your honesty — how do you feel about that now?",
  "Can you tell me more about what made you feel that way?",
  "That must be tough. What do you wish had happened instead?",
  "How do you think the other person feels in that moment?"
];

const fakeSummary = [
  "You’re seeking understanding and connection.",
  "You’re reflecting on emotional support.",
  "There’s a desire to be heard and valued.",
  "You're navigating tension with vulnerability.",
  "You're trying to build empathy and insight."
];

router.post('/', async (req, res) => {
  const { text, userId, phase = 'onboarding' } = req.body;

  const aiText = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
  const emotion = fakeEmotions[Math.floor(Math.random() * fakeEmotions.length)];
  const summary = fakeSummary[Math.floor(Math.random() * fakeSummary.length)];

  const message = new Message({ userId, userText: text, aiText, phase });
  await message.save();

  res.json({ response: aiText, emotion, summary });
});

module.exports = router;
