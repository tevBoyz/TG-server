const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;



const bot = new TelegramBot(token);
bot.setWebHook(`https://tg-server-rn4f.onrender.com/bot${token}`);


const app = express();
app.use(express.json());

const uniqueUsers = new Set();

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  uniqueUsers.add(chatId)

  bot.sendMessage(chatId, '🎮 Tap the button below to launch the game:', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🎮 Launch Game',
          web_app: {
            url: 'https://numbers-newest.vercel.app/' // your actual game link
          }
        }
      ]]
    }
  });
  console.log('Users Count:', uniqueUsers.size);

});

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});