const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '7618603606:AAEW1WrJbNIK4H4sq_EP65HwELYAvvD29zk';
const bot = new TelegramBot(token, { polling: true });
const app = express();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Play the game:', {
    reply_markup: {
      keyboard: [[{
        text: '🎮 Launch Game',
        web_app: {
          url: 'https://numbers-xi.vercel.app'
        }
      }]],
      resize_keyboard: true
    }
  });
});

app.listen(3000, () => console.log('Bot server running on port 3000'));
