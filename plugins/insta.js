/* Credits: souravkl11, raganork-api
(c) souravkl11 2022 All rights reserved
*/
const skl = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const got = require("got");
const axios = require('axios');
const setting = require('../config');
const raganork = require('raganork-bot');
const Config = require('../config');
const s = require('../config');
const v = s.CHANNEL
const need = "ɴᴇᴇᴅ ɪɴѕᴛᴀɢʀᴀᴍ ʟɪɴᴋ";
const need_acc = "ᴛʏᴘᴇ ɪɴѕᴛᴀɢʀᴀᴍ ᴜsᴇʀɴᴀᴍᴇ";
const fail = "*ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ ᴄʜᴇᴄᴋ ᴛʜᴇ ʟɪɴᴋ*";
const need_acc_s = "ɴᴇᴇᴅ ᴜsᴇʀɴᴀᴍᴇ";
let sourav = setting.WORKTYPE == 'public' ? false : true
skl.addCommand({ pattern: 'insta ?(.*)', fromMe: sourav,dontAddCommandList: true }, (async (msg, query) => {
if (query[1] && !msg.reply_message.text) {
if (!query[1].includes('instagram.com')) return await msg.client.sendMessage(msg.jid, need, MessageType.text, {quoted: msg.data});
var res = await raganork.query.getPost(query[1],v)
var buffer = await raganork.query.skbuffer(res.links[0].url)
if (!res) return await msg.client.sendMessage(msg.jid, fail, MessageType.text, {quoted: msg.data});
if (res.links[0].url.includes('mp4')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.video, { mimetype: Mimetype.mp4, caption: 'ᴜѕᴇʀɴᴀᴍᴇ: *' + `${res.username}` + '*\n ɴᴀᴍᴇ: *' + `${res.name}` + '*\n ʟɪᴋᴇs: *' + `${res.likes}` + '*', quoted: msg.data});
if (res.links[0].url.includes('jpg')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.image, { mimetype: Mimetype.jpg, caption: 'ᴜѕᴇʀɴᴀᴍᴇ: *' + `${res.username}` + '*\n ɴᴀᴍᴇ: *' + `${res.name}` + '*\n ʟɪᴋᴇs: *' + `${res.likes}` + '*', quoted: msg.data});
}
else if (!query[1] && msg.reply_message.text) {
if (!msg.reply_message.text.includes('instagram.com')) return await msg.client.sendMessage(msg.jid, need, MessageType.text, {quoted: msg.data});
var s1 = msg.reply_message.text
var souravkl11 = s1.split('instagram.com')
var q = 'https://instagram.com' + souravkl11[1]
var res = await raganork.query.getPost(q,v )
var buffer = await raganork.query.skbuffer(res.links[0].url)
if (!res) return await msg.client.sendMessage(msg.jid, fail, MessageType.text, {quoted: msg.data});
if (res.links[0].url.includes('mp4')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.video, { mimetype: Mimetype.mp4, caption: 'ᴜsᴇʀɴᴀᴍᴇ: *' + `${res.username}` + '*\n ɴᴀᴍᴇ: *' + `${res.name}` + '*\n ʟɪᴋᴇѕ: *' + `${res.likes}` + '*', quoted: msg.data});
if (res.links[0].url.includes('jpg')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.image, { mimetype: Mimetype.jpg, caption: 'ᴜsᴇʀɴᴀᴍᴇ: *' + `${res.username}` + '*\n ɴᴀᴍᴇ: *' + `${res.name}` + '*\n ʟɪᴋᴇѕ: *' + `${res.likes}` + '*', quoted: msg.data});
}
else return await msg.client.sendMessage(msg.jid, need, MessageType.text, {quoted: msg.data});
}));
skl.addCommand({ pattern: 'ig ?(.*)', fromMe: sourav,dontAddCommandList: true }, (async (msg, query) => {
if (query[1] === '') return await msg.client.sendMessage(msg.jid, need_acc, MessageType.text, {quoted: msg.data});
var res = await raganork.query.getStalk(query[1])
var buffer = await raganork.query.skbuffer(res.user.hd_profile_pic_url_info.url)
if (!res.user) return await msg.client.sendMessage(msg.jid, "_Username invalid!_", MessageType.text, {quoted: msg.data})
await msg.client.sendMessage(msg.jid, buffer, MessageType.image, { mimetype: Mimetype.jpg, caption: 'ɴᴀᴍᴇ: ' + `${res.user.full_name}` + '\n ʙɪᴏ: *' + `${res.user.biography}`+ '*\n ᴘʀɪᴠᴀᴛᴇ ᴀᴄᴄ: *' + `${res.user.is_private} ` + '*\n ғᴏʟʟᴏᴡᴇʀs: *' + `${res.user.follower_count}` + '*\n ғᴏʟʟᴏᴡɪɴɢ: *' + `${res.user.following_count}` + '*\n ᴘᴏsᴛs: *' + `${res.user.media_count}` + '*\n ᴠᴇʀɪғɪᴇᴅ: ' + `${res.user.is_verified} ` + '\n ɪɢᴛᴠ ᴠɪᴅᴇᴏs: *' + `${res.user.total_igtv_videos}` + '*', quoted: msg.data});
}));
skl.addCommand({ pattern: 'story ?(.*)', fromMe: sourav,dontAddCommandList: true }, (async (msg, query) => {
if (query[1] === '') return await msg.client.sendMessage(msg.jid, need_acc_s, MessageType.text, {quoted: msg.data});
var user = query[1];
var res = await raganork.query.getStory(user,v)
var url = ''
res.result.data.map((result) => {
url += result.url + ','});
var que = url !== false ? url.split(',') : [];
for (var i = 0; i < (que.length < res.result.data.length ? que.length : res.result.data.length); i++) {
var get = got(que[i], {https: {rejectUnauthorized: false}});
var stream = get.buffer();
stream.then(async (video) => {
await msg.client.sendMessage(msg.jid, video, MessageType.video, { mimetype: Mimetype.mp4, caption: '```Story of '+user + '```', quoted: msg.data});
})};
}));
