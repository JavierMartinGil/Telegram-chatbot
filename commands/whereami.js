const axios = require('axios')

module.exports = async (ctx) => {
    let texto = ctx.message.text
    let direccion = texto.substring(10, texto.length)
    let respuesta = await axios.get(`https://geocode.xyz/${direccion}?json=1`)
    console.log(respuesta.data.latt)
    ctx.replyWithPhoto(`https://maps.googleapis.com/maps/api/staticmap?center=${respuesta.data.latt},${respuesta.data.longt}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${respuesta.data.latt},${respuesta.data.longt}&key=AIzaSyAvfQLA0IZSelivxAclOiBPxQ8U4eds85w`)
}