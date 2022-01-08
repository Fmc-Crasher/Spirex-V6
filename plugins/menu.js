Skip to content
Fmc-Crasher
/
Spirex-v3
Public
forked from whitehatcrusher2/Its-me-ADARSH
Code
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Spirex-v3/plugins/menu.js
@Fmc-Crasher
Fmc-Crasher Update menu.js
 2 contributors
@Luciferking1@Fmc-Crasher
77 lines (35 sloc)  6.77 KB
/* Copyright (C) 2021 AMALSER.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Amalser - Amal
Wa.me/+919895828468
*/

const Neotro = require('../events');

const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');

const fs = require('fs');

const Config = require('../config')

const axios = require('axios')

const request = require('request');

const os = require('os');

var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    

var ggg = Buffer.from(clh.cd, 'base64')

var ddd = ggg.toString('utf-8')

Neotro.addCommand({pattern: 'menu', fromMe: false, dontAddCommandList: true}, (async (message, match) => {

// send a list message!

    const rows = [

        {title: '𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔', description: "©ᴍᴀ²ᴅ\n\n╭═══〘 *ᴅᴡɴʟᴅ ᴍᴇɴᴜ* 〙═══⊷❍\n┃♦️╭────────────────\n┃♦️│➫ *ᴀɴɪᴍᴇ*\n┃♦️│➫ *ᴀᴘᴋᴍᴏᴅ*\n┃♦️│➫ *ɪɢᴛᴠ*\n┃♦️│➫ *ɪᴍɢ*\n┃♦️│➫ *ɪɴѕᴛᴀ*\n┃♦️│➫ *ʀᴀѕʜᴍɪᴋᴀ*\n┃♦️│➫ *ѕᴏɴɢ*\n┃♦️│➫ *ᴠɪᴅᴇᴏ*\n┃♦️│➫ *ᴡᴀʟʟᴘᴀᴘᴇʀ*\n┃♦️╰───────────────\n╰══════════════════⊷\n\n ", rowId:" rowid1"},

        {title: '𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 𝐌𝐄𝐍𝐔', description: "©ᴍᴀ²ᴅ\n\n╭═══〘 *ᴄᴏɴᴠᴇʀᴛᴇʀ* 〙═══⊷❍\n┃♦️╭────────────────\n┃♦️│➫ *ɢɪғ*\n┃♦️│➫ *ᴍᴘ𝟹*\n┃♦️│➫ *ѕᴛɪᴄᴋᴇʀ*\n┃♦️│➫ *ᴍᴘ𝟺*\n┃♦️│➫ *ᴍᴘ𝟺ᴀᴜᴅɪᴏ*\n┃♦️│➫ *ɪᴍᴀɢᴇ ѕᴛɪᴄᴋᴇʀ*\n┃♦️╰───────────────\n╰══════════════════⊷\n\n ", rowId:"rowid2"},

        {title: '𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔', description: "©ᴍᴀ²ᴅ\n\n╭═══〘 *ѕᴇᴀʀᴄʜ* 〙═══⊷❍\n┃♦️╭────────────────\n┃♦️│➫ *ʏᴛ*\n┃♦️│➫ *ᴡᴇᴀᴛʜᴇʀ*\n┃♦️│➫ *ᴀᴅᴀɴ*\n┃♦️│➫ *ᴄᴏᴠɪᴅ*\n┃♦️│➫ *ɪɢѕᴛᴀᴄᴋ*\n┃♦️│➫ *ʟᴏᴄᴀᴛᴇ*\n┃♦️│➫ *ʟʏʀɪᴄ*\n┃♦️│➫ *ᴍᴏᴠɪᴇ*\n┃♦️│➫ *ɴᴇᴡѕ*\n┃♦️│➫ *ᴘɪɴѕᴛᴀ*\n┃♦️│➫ *ᴘʀᴏғɪɴѕᴛᴀ*\n┃♦️│➫ *ѕʜᴏᴡ*\n┃♦️╰───────────────\n╰══════════════════⊷\n\n ", rowId:" rowid3"},

        {title: '𝐌𝐀𝐊𝐄𝐑 𝐌𝐄𝐍𝐔', description: "©ᴍᴀ²ᴅ\n\n╭═══〘 *ᴍᴀᴋᴇʀ* 〙═══⊷❍\n┃♦️╭────────────────\n┃♦️│➫ *ᴀɴɪᴍᴇѕᴀʏ*\n┃♦️│➫ *ᴀᴛᴛᴘ*\n┃♦️│➫ *ᴄᴀʀʙᴏɴ*\n┃♦️│➫ *ᴄʜᴀɴɢᴇѕᴀʏ*\n┃♦️│➫ *ᴅᴇᴇᴘᴀɪ*\n┃♦️│➫ *ᴇғғᴇᴄᴛɪᴍɢ*\n┃♦️│➫ *ғғɪʀᴇ*\n┃♦️│➫ *ʟᴏɢᴏ*\n┃♦️│➫ *ᴍᴇᴍᴇ*\n┃♦️│➫ *ᴍᴍᴘᴀᴄᴋ*\n┃♦️│➫ *ᴍᴏʀᴇᴛxᴛ*\n┃♦️│➫ *ǫʀ*\n┃♦️│➫ *ʀᴇᴍᴏᴠᴇʙɢ*\n┃♦️│➫ *ᴛʙʟᴇɴᴅ*\n┃♦️│➫ *ᴛʀᴜᴍᴘѕᴀʏ*\n┃♦️│➫ *ᴛᴛᴘ*\n┃♦️│➫ *ᴛᴛѕ*\n┃♦️│➫ *ᴜɴᴠᴏɪᴄᴇ*\n┃♦️╰───────────────\n╰══════════════════⊷\n\n ", rowId:" rowid4"},

        {title: '𝐖𝐎𝐑𝐊𝐄𝐑 𝐌𝐄𝐍𝐔', description: "©ᴍᴀ²ᴅ\n\n╭═══〘 *ᴡᴏʀᴋᴇʀ* 〙═══⊷❍\n┃♦️╭────────────────\n┃♦️│➫ *ѕѕ*\n┃♦️│➫ *ᴛʀᴛ*\n┃♦️│➫ *ᴛɪɴʏ*\n┃♦️│➫ *ᴡᴀᴍᴇ*\n┃♦️│➫ *ᴏᴄʀ*\n┃♦️│➫ *ᴄᴀʟᴄ*\n┃♦️│➫ *ѕʜᴏʀᴛ*\n┃♦️│➫ *ʀᴅᴍᴏʀᴇ*\n┃♦️│➫ *ʙʀᴅᴍᴏʀᴇ*\n┃♦️│➫ *ǫᴜᴏᴛᴇ*\n┃♦️│➫ *ɪɴѕᴜʟᴛ*\n┃♦️│➫ *ʀᴀɴᴅᴏᴍ*\n┃♦️│➫ *ᴄᴜʀʀᴇɴᴄʏ*\n┃♦️│➫ *ᴄᴏᴍᴘʟɪᴍᴇɴᴛ*\n┃♦️│➫ *ᴅᴇᴛᴇᴄᴛʟᴀɴɢ*\n┃♦️╰───────────────\n╰══════════════════⊷ ", rowId:" rowid5"},

        {title: '𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒', description: "©ᴍᴀ²ᴅ\n\n╭════〘 *ᴏᴡɴᴇʀ ᴄᴍɴᴅ* 〙════⊷❍\n┃♦️╭────────────────────\n┃♦️│➫ *ᴊɪᴅ*\n┃♦️│➫ *ʙᴀɴ*\n┃♦️│➫ *ѕᴜᴅᴏ*\n┃♦️│➫ *ᴍᴜᴛᴇ*\n┃♦️│➫ *ѕᴘᴀᴍ*\n┃♦️│➫ *ɪɴᴠɪᴛᴇ*\n┃♦️│➫ *ᴡʜᴏɪѕ*\n┃♦️│➫ *ᴛᴀɢᴀʟʟ*\n┃♦️│➫ *ᴘᴜʙʟɪᴄ*\n┃♦️│➫ *ᴘʟᴜɢɪɴ*\n┃♦️│➫ *ᴅᴇᴍᴏᴛᴇ*\n┃♦️│➫ *ᴘʀɪᴠᴀᴛᴇ*\n┃♦️│➫ *ᴜɴᴍᴜᴛᴇ*\n┃♦️│➫ *ᴘʀᴏᴍᴏᴛᴇ*\n┃♦️│➫ *ᴀɴᴛɪʟɪɴᴋ*  \n┃♦️╰─────────────────\n╰═══════════════════⊷\n\n  ", rowId:" rowid6"}

       ]

       

       const sections = [{title: "© ᴄʀᴀѕʜᴇʀ", rows: rows}]

       

       const button = {

        buttonText: '𝐋𝐈𝐒𝐓 𝐌𝐄𝐍𝐔',

        description: "┌─〔 *_𝙾𝙵𝙵𝙸𝙲𝙸𝙰𝙻 𝙱𝙾𝚃_* 〕\n┊\n┊➥   ʜᴇͧʀᷤᴍͤɪͬ† ⚚ ᴘɪⷡᴋⷪᴀⷮᴄᷤʜᴜ \n└───────────────〄\n┌───〔 *_𝙳𝙴𝚃𝙰𝙸𝙻𝚂_* 〕\n┊ \n┊♦️ *ʀᴏʟᴇ* : *ᴏғғɪᴄɪᴀʟ*\n┊♦️ *ʟᴇᴠᴇʟ* : *(47 / 69)*\n┊♦️ *ѕᴘᴇᴇᴅ :* *0.1567*\n┊♦️ *ᴘʀᴇғɪx :*〔.#,〕\n┊♦️ *ᴡᴀ ᴠᴇʀѕɪᴏɴ:* 2.21.21.17\n┊♦️ *ᴡᴏʀᴋ ᴛʏᴘᴇ :*  *ᴘᴜʙʟɪᴄ*\n┊♦️ *ᴋᴇʀɴᴀʟ* : *ᴀɴᴅʀᴏɪᴅ*\n┊♦️ *ᴛᴇʀᴍɪɴᴀʟ :* *ʜᴇʀᴏᴋᴜ*\n┊♦️ *ʙᴀᴛᴛᴇʀʏ* : *𝟿2%*\n┊♦️ *ᴄ / ᴅ : ᴅɪѕᴄʜᴀʀɢɪɴɢ*\n┊♦️ *ᴅᴀᴛᴀʙᴀѕᴇ* *56 ᴏғ 100*\n┊♦️ *ᴅᴇᴠᴇʟᴏᴘᴇʀ* : *𝟺ᴅ𝟺ʀ𝟻ʜ*\n┊♦️ *ʀᴀᴍ :* *40.79MB / 1.8 GB*\n┊♦️ *©ᴍᴀ²ᴅ*\n└──────────────────〄 ", 

        sections: sections,

        listType: 1

       }

       

       await message.client.sendMessage(message.jid, button, MessageType.listMessage)

    

    }));
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
