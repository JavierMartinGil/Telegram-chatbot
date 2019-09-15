const axios = require('axios')

module.exports = async (ctx) => {
    let ciudad = ctx.message.text.split('/weather')[1].trim();
    let respuesta = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&apikey=167c7dd8e5dbfe65b6d448c20d4ef0e0&lang=es&units=metric`);
    ctx.reply('Temperatura actual: ' + respuesta.data.main.temp + 'º')
}