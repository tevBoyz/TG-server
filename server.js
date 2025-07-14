const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const numbers_token = process.env.NUMBERS_BOT_TOKEN;
const wordle_token = process.env.WORDLE_BOT_TOKEN;
const PORT = process.env.PORT || 3000;

const numbers_bot = new TelegramBot(numbers_token);
const wordle_bot = new TelegramBot(wordle_token);

numbers_bot.setWebHook(`https://tg-server-rn4f.onrender.com/bot${numbers_token}`);
wordle_bot.setWebHook(`https://tg-server-rn4f.onrender.com/bot${wordle_token}`);

const app = express();
app.use(express.json());

const uniqueUsers_numbers = new Set();
const uniqueUsers_wordle = new Set();

numbers_bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  uniqueUsers_numbers.add(chatId)

  numbers_bot.sendMessage(chatId, '🎮 Tap the button below to start:', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🎮 Start',
          web_app: {
            url: 'https://numbers-newest.vercel.app/' // your actual game link
          }
        }
      ]]
    }
  });
  console.log('Numbers Game Players Count:', uniqueUsers_numbers.size);

});

wordle_bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  uniqueUsers_wordle.add(chatId)

  wordle_bot.sendMessage(chatId, '🎮 Tap the button below to play:', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🎮 Start',
          web_app: {
            url: 'https://wordle-clone-ten-rho.vercel.app/' // your actual game link
          }
        }
      ]]
    }
  });
  console.log('Wordle Game Players Count:', uniqueUsers_wordle.size);

});

app.post(`/bot${numbers_token}`, (req, res) => {
  numbers_bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.post(`/bot${wordle_token}`, (req, res) => {
  wordle_bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});