// Plugin for raganork by souravkl11
var ra = require('../events');
var {MessageType, Mimetype} = require('@adiwajshing/baileys');
var axios = require('raganork-bot');
ra.addCommand({pattern: 'hermitqr ?(.*)', fromMe: true, desc: 'Generates QR code for WhatsApp web' , dontAddCommandList: true }, async (m, q) => {
await m.client.sendMessage(m.jid, await axios.query.skbuffer('https://baileys-qr.herokuapp.com/api/raganork-qr'), MessageType.image, {mimetype: Mimetype.jpg, quoted: m.data,caption:"1)𝗚𝗢 𝗧𝗢 𝗟𝗜𝗡𝗞𝗘𝗗 𝗗𝗘𝗩𝗜𝗖𝗘 𝗢𝗙 𝗬𝗢𝗨𝗥 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣\n2) ѕᴄᴀɴ ғᴀѕᴛ ᴏɴʟʏ 𝟸𝟶 ѕᴇᴄ"})});
