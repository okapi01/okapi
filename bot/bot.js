const { Telegraf } = require("telegraf");
const express = require("express");
require('dotenv').config();
const TOKEN = process.env.TOKEN;
console.log('Current Directory:', __dirname);
console.log('Token:', TOKEN);
if (!TOKEN) {
    throw new Error("Bot token is not defined in .env file");
}
const bot = new Telegraf(TOKEN);
const app = express();
app.use(express.json());
const web_link = "https://okapi-topaz.vercel.app/";
const community_link = "https://t.me/okapicommunity";

bot.start((ctx) => {
    const startPayload = ctx.startPayload;
    const urlSent = `${web_link}?ref=${startPayload}`;
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username}` : user.first_name;

    ctx.replyWithHTML(`<b>Hey, ${userName}!</b> Welcome to okapitapbot\n\nTap on the coin, explore and earn your way up to riches and wealth.\n\nOKAPI GAME is a decentralized system on the Ton Blockchain.\n\nReady to explore? Click on play to get started.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "👋 Start now!", web_app: { url: urlSent } }],
                [{ text: "Join our Community", url: community_link }]
            ]
        }
    }).catch(err => {
        console.error('Failed to send message:', err);
    });
});

bot.launch().catch(err => {
    console.error('Failed to start bot:', err);
});

app.listen(3000, () => {
    console.log("Server is up and running");
}).on('error', err => {
    console.error('Failed to start server:', err);
});