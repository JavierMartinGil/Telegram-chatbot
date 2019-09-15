const TelegrafWit = require('telegraf-wit');

const wit = new TelegrafWit(process.env.WIT_TOKEN);

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        wit.meaning(message.text)
            .then(result => {
                message.nlu = result;
                resolve(message);
            })
    })
}