const truecaller = require('raganork-bot')
const New = require('../events');
const s = require('../config');
const {MessageType} = require('@adiwajshing/baileys');
const v = s.CHANNEL
const sourav = s.WORKTYPE == 'public' ? false : true
New.addCommand({pattern: 'true ?(.*)', desc: 'Searches for number in truecaller!',fromMe: sourav}, async (msg, query) => {
if (!query[1] && !msg.reply_message) return await msg.reply("_Give me any number or reply to any user!_");
if (query[1].includes('/')) return await msg.client.sendMessage(msg.jid, 'Wrong format! \n\n .true +91 6282344739', MessageType.text, {quoted: msg.data})
var go;
if (msg.reply_message) go = msg.reply_message.jid.split('@')[0]
else if (!query[1].includes('@')) go = query[1]
else if (msg.mention) {
var mm = '';
msg.mention.map(async (user) => {
mm += user.split('@')[0];
});
go = mm
} 
var initt = go.split(" ").join("")
var number = initt.replace('+','')
const res = await truecaller.query.find(number,'',v)
if (!res) return await msg.sendMessage("Server returned with an error: 429")
await msg.client.sendMessage(msg.jid, '*ᴅᴇᴛᴀɪʟѕ ᴏғ ᴛʜᴇ ɴᴜᴍʙᴇʀ:* \n\n' + "ɴᴜᴍʙᴇʀ: " +res.phones[0].e164Format + '\n' +
"ɴᴀᴍᴇ:" +' *' + res.name+ '*\n' +
"ᴀᴄᴄᴇѕѕ:" +' *' + res.access + '*\n' +
"ᴄᴀʀᴇᴇʀ:" +' *' + res.phones[0].carrier + '*\n' +
"ᴄᴏᴜɴᴛʀʏ:" +' *' + res.phones[0].countryCode + '*\n' +
"ᴄɪᴛʏ:" +' *' + res.addresses[0].city + '*\n' +
"ᴘʀᴇғɪx:" +' *' + res.phones[0].dialingCode + '*\n' +
"ѕᴄᴏʀᴇ" +' *' + res.score + '*\n\n' +
"ᴜɪᴅ:" +' *' + res.id + '*\n' +
"ɴᴜᴍʙᴇʀ ᴛʏᴘᴇ:" +' *' + res.phones[0].numberType + '*\n' +
"ᴛɪᴍᴇ ᴢᴏɴᴇ:" +' *' + res.addresses[0].timeZone + '*\n', MessageType.text, {quoted: msg.data});});
