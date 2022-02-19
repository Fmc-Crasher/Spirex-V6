// Plugin for raganork by souravkl11
var ra = require('../events');
var {MessageType, Mimetype} = require('@adiwajshing/baileys');
var axios = require('raganork-bot');
ra.addCommand({pattern: 'hermitqr ?(.*)', fromMe: true, desc: 'Generates QR code for WhatsApp web' , dontAddCommandList: true }, async (m, q) => {
await m.client.sendMessage(m.jid, await axios.query.skbuffer('https://baileys-qr.herokuapp.com/api/raganork-qr'), MessageType.image, {mimetype: Mimetype.jpg, quoted: m.data,caption:"1)𝗨𝗦𝗘 𝗧𝗛𝗜𝗦 𝗤𝗥 𝗧𝗢 𝗠𝗔𝗞𝗘 𝗛𝗘𝗥𝗠𝗜𝗧\n 2) 𝗦𝗖𝗔𝗡 𝗙𝗔𝗦𝗧 𝗩𝗔𝗟𝗜𝗗 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝟮𝟬 𝗦𝗘𝗖𝗦"})});
