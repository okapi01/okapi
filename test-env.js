require('dotenv').config({ path: './.env' });

const TOKEN = process.env.TOKEN;
console.log('TOKEN:', TOKEN); // Debugging statement

if (!TOKEN) {
    throw new Error("Bot token is not defined in .env file");
}
