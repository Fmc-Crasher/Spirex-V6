var e = require('../events')
var {MessageType,Mimetype} = require('@adiwajshing/baileys')
const c = require('../config')
var f = require('raganork-bot')
var v = c.SESSION
var fm = c.WORKTYPE == 'public' ? false : true
e.addCommand({pattern: 'find ?(.*)', fromMe: fm}, (async (m, match) => {    
if (!m.reply_message.text && !m.reply_message.video && !m.reply_message.sticker && !m.reply_message.image) {
var q = await m.client.downloadAndSaveMediaMessage({key: { remoteJid: m.reply_message.jid,id: m.reply_message.id}, message: m.reply_message.data.quotedMessage});
var k = c.find_key
var r = await f.query.music(q,k,v)
if (r.result) {
let msg =  'ᴛɪᴛʟᴇ: *' + r.result.title + '* \nᴀʟʙᴜᴍ: *' + r.result.album+'* \nᴀʀᴛɪѕᴛ: *' + r.result.artist+ '* \nʟᴀʙᴇʟ: *' + r.result.label+'* \nʀᴇʟᴇѕᴇ ᴅᴀᴛᴇ: *' + r.result.release_date + '* \nѕᴏɴɢ ʟɪɴᴋ: ' + 'https://www.youtube.com/results?search_query='+r.result.title.split(' ').join('+')
return await m.client.sendMessage(m.jid, msg, MessageType.text, {quoted: m.data})}
if (r.error && r.error.error_code == '900') return await m.client.sendMessage(m.jid, "ᴇʀᴏᴏʀ ᴀᴀʏɪ 😹", MessageType.text,{quoted: m.data})
if (!r.result) return await m.client.sendMessage(m.jid, "ɪ ᴅᴏɴᴛ ᴋɴᴏᴡ ᴠʀᴏ", MessageType.text,{quoted: m.data})}
else {return await m.client.sendMessage(m.jid, "ʀᴇᴘʟʏ 𝟸 ᴀᴜᴅɪᴏ", MessageType.text,{quoted: m.data})}}));
