const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;



const bot = new TelegramBot(token);
bot.setWebHook(`https://your-render-url.onrender.com/bot${token}`);


const app = express();
app.use(express.json());

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Play the game:', {
    reply_markup: {
      inline_keyboard: [[{
        text: '🎮 Launch Game',
        web_app: {
          url: 'https://numbers-newest.vercel.app'
        }
      }]],
      // resize_keyboard: true,
      // one_time_keyboard: false
    }
  });
});

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});