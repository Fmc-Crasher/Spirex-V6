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
var v = s.CHANNEL
var need = "*ɴᴇᴇᴅ ɪɴsᴛᴀɢʀᴀᴍ ʟɪɴᴋ*";
var downloading = "*⇓ ɪɴѕᴛᴀ ᴠɪᴅᴇᴏ* 🌝";
var need_acc = "*ɴᴇᴇ ᴀɴ ɪɴsᴛᴀɢʀᴀᴍ ᴜsᴇʀɴᴀᴍᴇ*";
var fail = "*ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ! ᴄʜᴇᴄᴋ ʏᴏᴜʀ ʟɪɴᴋ ᴀɴᴅ ᴛʀʏ ᴀɢᴀɪɴ*";
var need_acc_s = "ɴᴇᴇᴅ ᴀɴ ɪɴsᴛᴀɢʀᴀᴍ ᴜsᴇʀɴᴀᴍᴇ ᴏʀ ʟɪɴᴋ";
let sourav = setting.WORKTYPE == 'public' ? false : true
skl.addCommand({ pattern: 'insta ?(.*)', fromMe: sourav,dontAddCommandList: true }, (async (msg, query) => {
var q = !msg.reply_message.message ? query[1] : msg.reply_message.message
if (!q)  return await msg.client.sendMessage(msg.jid, 'ᴜɴᴀʙʟᴇ ᴛᴏ ʀᴇᴀᴅ ʟɪɴᴋ !', MessageType.text, {quoted: msg.data});
if (q && !q.includes('instagram.com')) return await msg.client.sendMessage(msg.jid, need, MessageType.text, {quoted: msg.data});
var getid = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com(?:\/.+?)?\/(p|reel|tv)\/)([\w-]+)(?:\/)?(\?.*)?$/
var url = getid.exec(q)
if (url != null) {
var res = await raganork.query.getPost(url[0],v )
if (res === "false") return await msg.client.sendMessage(msg.jid, fail, MessageType.text, {quoted: msg.data});
else await msg.client.sendMessage(msg.jid, downloading, MessageType.text, {quoted: msg.data});
var buffer = await raganork.query.skbuffer(res.links[0].url)
if (res.links[0].url.includes('mp4')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.video, { mimetype: Mimetype.mp4, quoted: msg.data});
if (res.links[0].url.includes('jpg')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.image, { mimetype: Mimetype.jpg, quoted: msg.data});
}
else if (url == null) {
var linksplit = q.split('https://')[1]
var res = await raganork.query.getPost('https://'+linksplit,v )
if (res === "false") return await msg.client.sendMessage(msg.jid, fail, MessageType.text, {quoted: msg.data});
else await msg.client.sendMessage(msg.jid, downloading, MessageType.text, {quoted: msg.data});
var buffer = await raganork.query.skbuffer(res.links[0].url)
if (res.links[0].url.includes('mp4')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.video, { mimetype: Mimetype.mp4, quoted: msg.data});
if (res.links[0].url.includes('jpg')) return await msg.client.sendMessage(msg.jid, buffer, MessageType.image, { mimetype: Mimetype.jpg, quoted: msg.data});
    
}
}));
skl.addCommand({ pattern: 'ig ?(.*)', fromMe: sourav,dontAddCommandList: true }, (async (msg, query) => {
    if (query[1] === '') return await msg.client.sendMessage(msg.jid, need_acc, MessageType.text, {quoted: msg.data});
    var res = await raganork.query.getStalk(query[1])
    if (res === "false") return await msg.client.sendMessage(msg.jid, "Username invalid!", MessageType.text, {quoted: msg.data})
    var buffer = await raganork.query.skbuffer(res.hd_profile_pic_url_info.url)
    await msg.client.sendMessage(msg.jid, buffer, MessageType.image, { mimetype: Mimetype.jpg, caption: '_*Name:*_ ' + `${res.fullname}` + '\n _*Bio:*_ ' + `${res.biography}`+ '\n _*Private account:*_ ' + `${res.is_private} ` + '\n _*Followers:*_ ' + `${res.followers}` + '\n _*Following:*_ ' + `${res.following}` + '\n _*Posts:*_ ' + `${res.post_count}` + '\n _*Verified:*_ ' + `${res.is_verified} ` + '\n _*IGTV videos:*_ ' + `${res.total_igtv_videos}`, quoted: msg.data});
    }));
skl.addCommand({ pattern: 'story ?(.*)', fromMe: sourav,dontAddCommandList: true }, (async (msg, query) => {
if (query[1] === '') return await msg.client.sendMessage(msg.jid, need_acc_s, MessageType.text, {quoted: msg.data});
var user = query[1];
var res = await raganork.query.getStory(user,v)
if (res === "false") return await msg.client.sendMessage(msg.jid, "Story not found!", MessageType.text, {quoted: msg.data})
var url = ''
res.result.stories.map((result) => {
url += result.url + ','});
var que = url !== false ? url.split(',') : [];
for (var i = 0; i < (que.length < res.result.stories.length ? que.length : res.result.stories.length); i++) {
var get = got(que[i], {https: {rejectUnauthorized: false}});
var stream = get.buffer();
stream.then(async (video) => {
await msg.client.sendMessage(msg.jid, video, MessageType.video, { mimetype: Mimetype.mp4, caption: '```Story of '+res.result.username + '```', quoted: msg.data});
})};
}));
