// instalar librerias
// variables de entorno con token
// NGROK

require('dotenv').config();

const Telegraf = require('telegraf')
const express = require('express')
const expressApp = express()

const nlu = (require('./nlu'));
const dialog = (require('./dialog'))

const testCommand = require('./commands/test');
const helpCommand = require('./commands/help');
const weatherCommand = require('./commands/weather');
const whereamiCommand = require('./commands/whereami');
const creatorCommand = require('./commands/creator');

const bot = new Telegraf(process.env.BOT_TOKEN)
expressApp.use(bot.webhookCallback('/secret-path'))
bot.telegram.setWebhook('https://2e4d94cb.ngrok.io/secret-path')

expressApp.get('/', (req, res) => {
    res.send('Hello World!')
})

expressApp.post('/secret-path', (req, res) => {
    console.log('peticion post del webhook')
})

bot.command('start', (ctx) => {
    console.log(ctx.message);
    ctx.reply('Hola, soy Robotcop, ¿en que puedo ayudarle? Esto es lo que puedo hacer:\n /help -> Ayuda \n /creator -> Información del creador\n /weather Ciudad -> Muestra info del tiempo de tu ciudad\n /whereami TuDireccion -> Muestra la latitud y longitud de donde te encuentras')
})

bot.command('test', testCommand);
bot.command('help', helpCommand);
bot.command('weather', weatherCommand);
bot.command('whereami', whereamiCommand);
bot.command('creator', creatorCommand);

bot.on('text', (ctx) => {
    nlu(ctx.message)
        .then(dialog)
        .then(respuesta => {
            bot.telegram.sendMessage(ctx.from.id, respuesta);
        })
})

expressApp.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})