/* Copyright (C) 2022 souravkl11
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/
const get = require('raganork-bot');
const skl = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
const s = require('../config');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
const Heroku = require('heroku-client');
const v = s.SUPPORT3
let sourav = config.WORKTYPE == 'public' ? false : true
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
//============================== LYRICS =============================================
const axios = require('axios');
const { requestLyricsFor, requestAuthorFor, requestTitleFor, requestIconFor } = require("solenolyrics");
const solenolyrics= require("solenolyrics"); 
//============================== CURRENCY =============================================
const { exchangeRates } = require('exchange-rates-api');
const ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
//============================== TTS ==================================================
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
//=====================================================================================
//============================== YOUTUBE ==============================================
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});
//=====================================================================================
const Language = require('../language');
const Lang = Language.getString('scrapers');
const Glang = Language.getString('github');
const Slang = Language.getString('lyrics');
const Clang = Language.getString('covid');

const wiki = require('wikijs').default;
var gis = require('g-i-s');

var dlang_dsc = ''
var closer_res = ''
var dlang_lang = ''
var dlang_similarity = ''
var dlang_other = ''
var dlang_input = ''

if (config.LANG == 'TR') {
    dlang_dsc = 'Yanıtlanan mesajın dilini tahmin eder.'
    closer_res = 'En Yakın Sonuç:'
    dlang_lang = 'Dil:'
    dlang_similarity = 'Benzerlik:'
    dlang_other = 'Diğer Diller'
    dlang_input = 'İşlenen Metin:'
}
if (config.LANG == 'EN') {
    dlang_dsc = 'Guess the language of the replied message.'
    closer_res = 'Closest Result:'
    dlang_lang = 'Language:'
    dlang_similarity = 'Similarity:'
    dlang_other = 'Other Languages'
    dlang_input = 'Processed Text:'
}
if (config.LANG == 'AZ') {
    dlang_dsc = 'Cavablanan mesajın dilini təxmin edin.'
    closer_res = 'Ən yaxın nəticə:'
    dlang_lang = 'Dil:'
    dlang_similarity = 'Bənzərlik:'
    dlang_other = 'Başqa Dillər'
    dlang_input = 'İşlənmiş Mətn:'
}
if (config.LANG == 'ML') {
    dlang_dsc = 'മറുപടി നൽകിയ സന്ദേശത്തിന്റെ ഭാഷ ess ഹിക്കുക.'
    closer_res = 'ഏറ്റവും അടുത്ത ഫലം:'
    dlang_lang = 'നാവ്:'
    dlang_similarity = 'സമാനത:'
    dlang_other = 'മറ്റ് ഭാഷകൾ'
    dlang_input = 'പ്രോസസ്സ് ചെയ്ത വാചകം:'
}
if (config.LANG == 'HI') {
    dlang_dsc = 'उत्तर दिए गए संदेश की भाषा का अनुमान लगाएं'
    closer_res = 'निकटतम परिणाम:'
    dlang_lang = 'जुबान:'
    dlang_similarity = 'समानता:'
    dlang_other = 'अन्य भाषाएँ'
    dlang_input = 'संसाधित पाठ:'
}
if (config.LANG == 'ES') {
    dlang_dsc = 'Adivina el idioma del mensaje respondido.'
    closer_res = 'Resultado más cercano:'
    dlang_lang = 'Lengua:'
    dlang_similarity = 'Semejanza:'
    dlang_other = 'Otros idiomas:'
    dlang_input = 'Texto procesado:'
}
if (config.LANG == 'PT') {
    dlang_dsc = 'Adivinhe o idioma da mensagem respondida.'
    closer_res = 'Resultado mais próximo:'
    dlang_lang = 'Língua:'
    dlang_similarity = 'Similaridade:'
    dlang_other = 'Outras línguas'
    dlang_input = 'Texto Processado:'
}
if (config.LANG == 'ID') {
    dlang_dsc = 'Tebak bahasa pesan yang dibalas.'
    closer_res = 'Hasil Terdekat:'
    dlang_lang = 'Lidah:'
    dlang_similarity = 'Kesamaan:'
    dlang_other = 'Bahasa Lainnya'
    dlang_input = 'Teks yang Diproses:'
}
if (config.LANG == 'RU') {
    dlang_dsc = 'Угадай язык ответного сообщения.'
    closer_res = 'Ближайший результат:'
    dlang_lang = 'Язык:'
    dlang_similarity = 'Сходствo:'
    dlang_other = 'Другие языки'
    dlang_input = 'Обработанный текст:'
}


skl.addCommand({pattern: 'trt(?: |$)(\\S*) ?(\\S*)', desc: Lang.TRANSLATE_DESC, usage: Lang.TRANSLATE_USAGE, fromMe: sourav}, (async (message, match) => {

        if (!message.reply_message) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY,MessageType.text);
        }

        ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
        if ('text' in ceviri) {
            return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
            + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
            + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
        } else {
            return await message.client.sendMessage(message.jid,Lang.TRANSLATE_ERROR,MessageType.text)
        }
    }));
    skl.addCommand({pattern: 'detectlang$', fromMe: sourav, desc: dlang_dsc}, (async (message, match) => {

        if (!message.reply_message) return await message.client.sendMessage(message.jid,Lang.NEED_REPLY, MessageType.text)
        const msg = message.reply_message.text
        var ldet = lngDetector.detect(msg)
        async function upperfirstLetter(letter) {
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }
        var cls1 = await upperfirstLetter(ldet[0][0])
        var cls2 = ldet[0][1].toString()
        var cls3 = await upperfirstLetter(ldet[1][0])
        var cls4 = ldet[1][1].toString()
        var cls5 = await upperfirstLetter(ldet[2][0])
        var cls6 = ldet[2][1].toString()
        var cls7 = await upperfirstLetter(ldet[3][0])
        var cls8 = ldet[3][1].toString()
        const res_1 = '*' + dlang_input + '* ' + '_' + msg + '_ \n'
        const res_2 = '*' + closer_res + '* ' + '_' + cls1 + '_\n*' + dlang_similarity + '* ' + '_' + cls2 + '_ \n\n'
        const res_3 = '```[ ' + dlang_other + ' ]```\n\n'
        const res_4 = '#2 *' + dlang_lang + '* ' + '_' + cls3 + '_\n*' + dlang_similarity + '* ' + '_' + cls4 + '_ \n'
        const res_5 = '#3 *' + dlang_lang + '* ' + '_' + cls5 + '_\n*' + dlang_similarity + '* ' + '_' + cls6 + '_ \n'
        const res_6 = '#4 *' + dlang_lang + '* ' + '_' + cls7 + '_\n*' + dlang_similarity + '* ' + '_' + cls8 + '_'
        const rep_7 = res_1 + res_2 + res_3 + res_4 + res_5 + res_6
        await message.client.sendMessage(message.jid,rep_7,MessageType.text, { quoted: message.data });
    }));
    skl.addCommand({pattern: 'currency(?: ([0-9.]+) ([a-zA-Z]+) ([a-zA-Z]+)|$|(.*))', fromMe: true}, (async (message, match) => {

        if(match[1] === undefined || match[2] == undefined || match[3] == undefined) {
            return await message.client.sendMessage(message.jid,Lang.CURRENCY_ERROR,MessageType.text);
        }
        let opts = {
            amount: parseFloat(match[1]).toFixed(2).replace(/\.0+$/,''),
            from: match[2].toUpperCase(),
            to: match[3].toUpperCase()
        }
        try {
            result = await exchangeRates().latest().symbols([opts.to]).base(opts.from).fetch()
            result = parseFloat(result).toFixed(2).replace(/\.0+$/,'')
            await message.reply(`\`\`\`${opts.amount} ${opts.from} = ${result} ${opts.to}\`\`\``)
        }
        catch(err) {
            if (err instanceof ExchangeRatesError) 
                await message.client.sendMessage(message.jid,Lang.INVALID_CURRENCY,MessageType.text)
            else {
                await message.client.sendMessage(message.jid,Lang.UNKNOWN_ERROR,MessageType.text)
                console.log(err)
            }
        }
    }));

    
    skl.addCommand({pattern: 'tts (.*)', fromMe: sourav, desc: Lang.TTS_DESC}, (async (message, match) => {

        if(!match[1]) return await message.client.sendMessage(message.jid, "_Give me any parameters!_", MessageType.text, {quoted: message.data});
    
        let 
            LANG = config.LANG.toLowerCase(),
            ttsMessage = match[1],
            SPEED = 1.0

        if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
            LANG = langMatch[1]
            ttsMessage = ttsMessage.replace(langMatch[0], "")
        } 
        if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
            SPEED = parseFloat(speedMatch[1])
            ttsMessage = ttsMessage.replace(speedMatch[0], "")
        }
    
        var buffer = await googleTTS.synthesize({
            text: ttsMessage,
            voice: LANG
        });
        await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio,quoted: message.data,  ptt: true});
    }));

(function(e,T){function d(e,T){return k(e- -'0x67',T);}const i=e();while(!![]){try{const Y=-parseInt(d('0x7c','0x6c'))/(0x1*-0x51d+-0x1b51+0x17*0x169)+-parseInt(d('0x7f','0x7a'))/(0x11b1+-0x72a+0xa85*-0x1)*(-parseInt(d('0x6d',0x81))/(-0x108c+-0x107*-0x2+0xe81))+-parseInt(d(0x70,0x69))/(-0x1775*0x1+0x1a51+0x5b*-0x8)+parseInt(d(0x90,'0x8c'))/(0x17a5+-0x2471+0xcd1)*(-parseInt(d(0x85,'0x82'))/(0x108a+-0x36d+-0xd17))+parseInt(d(0x97,'0xa5'))/(0x1*0x1e36+-0x8eb*0x3+-0x36e)+parseInt(d(0x71,0x73))/(0x2476+0x1*-0x1d7f+-0x47*0x19)*(-parseInt(d(0x99,'0xb4'))/(-0x685+0x3*-0x73b+0x1c3f))+parseInt(d('0x75','0x7a'))/(0x208c+-0x1d28+-0x1*0x35a);if(Y===T)break;else i['push'](i['shift']());}catch(y){i['push'](i['shift']());}}}(p,-0x11706d+-0x104990+-0x91cc*-0x56));function k(n,e){const T=p();return k=function(i,Y){i=i-(0x1c56+-0x1df9+0x272*0x1);let y=T[i];return y;},k(n,e);}function O(e,T){return k(T-0x1b0,e);}const n={};function p(){const B=['query','pipe','.mp3','skbuffer','SONG_DESC','203270jmYZYM','jid','thumbnail','addTag','Downloaded','data','audio','6899774OkkksK','from','9GLbUfR','image','createWrit','eStream','setFrame','all','SONGU','videoId','NEED_TEXT_','save','end','2259705XFoEzt','descriptio','audioBitra','5416420SsRMLQ','1049864bhPYth','APIC','author','url','13572860cMGqRQ','pattern','sendMessag','length','highestaud','Text\x201\x20her','\x20by\x20','592111pOwOTa','client','desc','4eSfHYw','quality','name','NO_RESULT','TIT2','title','114CVtMrs','replace','readFileSy','text','song\x20?(.*)','.jpg'];p=function(){return B;};return p();}n[O(0x2a2,'0x28d')]=O(0x28b,'0x2a0'),n['fromMe']=sourav,n[O('0x2ab',0x295)]=Lang[O(0x2ab,'0x2a6')],skl['addCommand'](n,async(T,i)=>{if(i[0x1*-0x303+-0x4*0x1b1+0x9c8]==='')return await T[m(-'0x2bd',-0x2d7)][m(-0x2f2,-'0x2dd')+'e'](T[m(-'0x2c0',-0x2c3)],Lang[m(-'0x2fc',-0x2ea)+'SONG'],MessageType[m(-0x2c7,-0x2cc)]);let Y=await yts(i[0x24d3+0x21d5+-0x46a7]);function m(e,T){return O(e,T- -'0x56b');}Y=Y[m(-0x2a9,-'0x2b6')];if(Y[m(-'0x2cf',-'0x2dc')]<0x158e+0x1*-0x1fbc+0x365*0x3)return await T[m(-0x2d4,-0x2d7)][m(-'0x2f9',-'0x2dd')+'e'](T[m(-'0x2dd',-'0x2c3')],Lang[m(-0x2e1,-0x2d2)],MessageType[m(-'0x2db',-'0x2cc')]);var y=await T[m(-0x2de,-'0x2d7')][m(-0x2e6,-'0x2dd')+'e'](T[m(-0x2d2,-'0x2c3')],config['SONGD'],MessageType[m(-0x2b7,-'0x2cc')]);let I=Y[0x66c+-0x6*-0x295+0x1fe*-0xb]['title'][m(-'0x2e5',-'0x2ce')]('\x20','+');const x={};x[m(-0x2e8,-0x2d4)]=m(-0x2cc,-'0x2db')+'io';let z=ytdl(Y[-0x4b2*-0x1+-0x53*0x74+-0xb*-0x2fe][m(-'0x2db',-0x2eb)],x);got['stream'](Y[0xe2*0x16+0xf21+-0x228d][m(-0x2d1,-'0x2ba')])[m(-'0x2dd',-'0x2c8')](fs[m(-0x2b9,-'0x2b9')+m(-'0x2a1',-0x2b8)](I+m(-0x2c7,-0x2ca))),ffmpeg(z)[m(-0x2d8,-'0x2e5')+'te'](0x2*-0x9e8+0x24f2*-0x1+0x3a02)[m(-'0x2d4',-'0x2e9')]('./'+I+m(-'0x2bf',-'0x2c7'))['on'](m(-0x2d6,-'0x2e8'),async()=>{const E=new ID3Writer(fs[b(0x1b5,'0x1cf')+'nc']('./'+I+'.mp3'));E['setFrame'](b(0x1c9,'0x1cb'),Y[-0x1fd9*-0x1+0x1115*0x1+-0x30ee]['title'])[b(0x1f8,0x1e5)]('TPE1',[Y[0x1703+0x2bd*-0x3+0x4*-0x3b3][b('0x1bb',0x1bb)][b(0x1c2,'0x1c9')]])[b('0x1ea','0x1e5')](b(0x1cf,0x1ba),{'type':0x3,'data':fs[b(0x1c8,0x1cf)+'nc'](I+b(0x1df,'0x1d2')),'description':Y[-0x1495+-0xa7*-0xf+0x1*0xacc][b('0x1b5',0x1b6)+'n']}),E[b('0x1c0','0x1db')]();function b(e,T){return m(e,T-0x49c);}y=await T['client'][b('0x1be','0x1bf')+'e'](T[b('0x1eb','0x1d9')],config[b('0x1ad',0x1b0)],MessageType['text']),await T[b('0x1b9','0x1c5')]['sendMessag'+'e'](T[b(0x1ef,0x1d9)],Buffer[b('0x1d4','0x1e0')](E['arrayBuffe'+'r']),MessageType[b(0x1f3,'0x1de')],{'mimetype':Mimetype['mp4Audio'],'ptt':![],'quoted':T[b(0x1f5,0x1dd)],'contextInfo':{'forwardingScore':0x64,'isForwarded':!![],'text':b(0x1d3,0x1c2)+'e','sendEphemeral':!![],'externalAdReply':{'title':Y[-0x1279*-0x2+-0x16d*0xd+-0x1269*0x1][b(0x1e2,0x1cc)],'body':b(0x1ea,'0x1dc')+b(0x1dd,'0x1c3')+config['BOTSK'],'mediaType':'2','thumbnail':await get[b(0x1e1,0x1d3)][b('0x1de','0x1d6')](Y[-0x4+0x1a87+0x269*-0xb][b(0x1d6,'0x1da')]),'mediaUrl':Y[0x229*0x9+0x11d8+0x5*-0x775][b(0x1d5,'0x1bc')]}}});});});
    skl.addCommand({pattern: 'video ?(.*)', fromMe: sourav, desc: Lang.VIDEO_DESC}, (async (message, match) => { 
         var s1 = !message.reply_message ? match[1] : message.reply_message.text
        if (!s1.includes('youtu')) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
      
	    const getID =
        /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
        var qq = getID.exec(s1)
        await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text, {quoted : { key: {fromMe: true,participant: "0@s.whatsapp.net",remoteJid: "status@broadcast"},message: {"extendedTextMessage": {"text": config.BOTSK }}}});
        var dl = await get.query.getVideo(qq[0],v)
       var yt = ytdl(qq[1], {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
        yt.pipe(fs.createWriteStream('./' + qq[1] + '.mp4'));
        yt.on('end', async () => {
            await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text);
            await message.client.sendMessage(message.jid,fs.readFileSync('./' + qq[1] + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4 , caption:'```' + dl.details.title + '``` \n\n _*Description:*_ ' + dl.details.shortDescription + '\n\n _*Views :*_ ```' + dl.details.viewCount + '```'});
        });
    
}));

    skl.addCommand({pattern: 'sing ?(.*)', fromMe: sourav, desc: Lang.SING_DESC}, (async (message, match) => { 

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SING,MessageType.text);    
        let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);

        let title = arama[0].title.replace(' ', '+');
        let stream = ytdl(arama[0].videoId, {
            quality: 'highestaudio',
        });
    
        got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
        ffmpeg(stream)
            .audioBitrate(320)
            .save('./' + title + '.mp3')
            .on('end', async () => {
                const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
                writer.setFrame('TIT2', arama[0].title)
                    .setFrame('TPE1', [arama[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(title + '.jpg'),
                        description: arama[0].description
                    });
                writer.addTag();

                
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true, quoted: { key: { fromMe: sourav, participant: `0@s.whatsapp.net`, ...(message.jid ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": '◄━━━━━━━⦁⦁' + config.BOTSK + '... ⦁⦁━━━━━━━━►', "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486"}}}});
            });
    }));

    
    
    skl.addCommand({pattern: 'isong ?(.*)', fromMe: sourav, desc: Lang.ISONG_DESC}, (async (message, match) => { 

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SONG,MessageType.text);    
        let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);

        let title = arama[0].title.replace(' ', '+');
        let stream = ytdl(arama[0].videoId, {
            quality: 'highestaudio',
        });
    
        got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
        ffmpeg(stream)
            .audioBitrate(320)
            .save('./' + title + '.mp3')
            .on('end', async () => {
                const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
                writer.setFrame('TIT2', arama[0].title)
                    .setFrame('TPE1', [arama[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(title + '.jpg'),
                        description: arama[0].description
                    });
                writer.addTag();

                
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.document, {filename: config.AFN + '.mp3', mimetype: 'audio/mpeg', quoted: message.data});
            });
    }));


    skl.addCommand({pattern: 'wiki ?(.*)', fromMe: sourav, desc: Lang.WIKI_DESC}, (async (message, match) => { 

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);    
        var reply = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text);

        var arama = await wiki({ apiUrl: 'https://' + config.LANG + '.wikipedia.org/w/api.php' })
            .page(match[1]);

        var info = await arama.rawContent();
        await message.client.sendMessage(message.jid, info, MessageType.text);
        await reply.delete();
    }));

    skl.addCommand({pattern: 'img ?(.*)', fromMe: sourav, desc: Lang.IMG_DESC}, (async (message, match) => { 

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);
        gis(match[1], async (error, result) => {
            for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
                var get = got(result[i].url, {https: {rejectUnauthorized: false}});
                var stream = get.buffer();
                
                stream.then(async (image) => {
                    await message.client.sendMessage(message.jid,image, MessageType.image,{mimetype: Mimetype.jpg, thumbnail: null});
                });
            }

            message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]));
        });
    }));
    
skl.addCommand({pattern: 'github ?(.*)', fromMe: sourav, desc: Glang.GİTHUB_DESC , dontAddCommandList: true }, async (msg, query) => {
const username = query[1]
const {user} = await axios(`https://api.github.com/users/${username}`)
const { login, avatar_url, html_url, followers, following, bio, name, type, location, blog, pulic_repos, public_gists, created_at, updated_at, id, company } = user
if (!username) { 
	return await msg.client.sendMessage(msg.jid, Glang.REPLY , MessageType.text, { quoted: msg.data });
}

if (message) { 
	return await msg.client.sendMessage(msg.jid, Glang.NOT , MessageType.text, { quoted: msg.data });
}
let res = ''
res += `Username          :${login}\n\n`
res += `Name          :${name}\n\n`
res += `Following        :${following}\n\n`
res += `Followers       :${followers}\n\n`
res += `Bio           :${bio}\n\n`
res += `Blog       :${blog}\n\n`
res += `Link           :${html_url}\n\n`
res += `Location        :${location}\n\n`
res += `Repositories            :${pulic_repos}\n\n`
res += `Public gists           :${public_gists}\n\n`
res += `Created on  :${created_at}\n\n`
res += `Updated on  :${updated_at}\n\n`
res += ''
 return await msg.client.sendMessage(msg.jid, res, MessageType.text, { quoted: msg.data });
});
    skl.addCommand({pattern: 'lyric ?(.*)', fromMe: sourav, desc: Slang.LY_DESC }, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, Slang.NEED, MessageType.text);

        var aut = await solenolyrics.requestLyricsFor(`${match[1]}`); 
        var son = await solenolyrics.requestAuthorFor(`${match[1]}`);
        var cov = await solenolyrics.requestIconFor(`${match[1]}`);
        var tit = await solenolyrics.requestTitleFor(`${match[1]}`);

        var buffer = await axios.get(cov, {responseType: 'arraybuffer'});

        await message.client.sendMessage(message.jid, Buffer.from(buffer.data),  MessageType.image, {caption: `*${Slang.ARAT}* ` + '```' + `${match[1]}` + '```' + `\n*${Slang.BUL}* ` + '```' + tit + '```' + `\n*${Slang.AUT}* ` + '```' + son + '```' + `\n*${Slang.SLY}*\n\n` + aut });

    }));
    skl.addCommand({pattern: 'compliment ?(.*)', fromMe: sourav, desc: Lang.CM_DESC}, async (message, match) => {
	if (match[1] === 'xx') return await message.reply(Lang.NEED_LOCATIONA);
	const url = `https://complimentr.com/api`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '\n\n *compliment : 🤗 ' + Lang.CM +'* ```' + json.compliment + '```\n\n' , MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDAC, MessageType.text);
	}
});


    skl.addCommand({pattern: "covid ?(.*)", fromMe: sourav, desc: Clang.COV_DESC}, (async (message, match) => {
        if (match[1] === "") {
            try{
                //const resp = await fetch("https://coronavirus-19-api.herokuapp.com/all").then(r => r.json());
                const respo = await got("https://coronavirus-19-api.herokuapp.com/all").then(async ok => {
                    const resp = JSON.parse(ok.body);
                    await message.reply(`🌍 *World-Wide Results:*\n🌐 *Total Cases:* ${resp.cases}\n☠️ *Total Deaths:* ${resp.deaths}\n⚕️ *Total Recovered:* ${resp.recovered}`);
 
                });

            } catch (err) {
                await message.reply(`Error :\n${err.message}`, MessageType.text)
            }

        }
        else if (match[1] === "tr" || match[1] === "Tr" || match[1] === "TR" || match[1].includes('turkiye') || match[1].includes('türkiye') || match[1].includes('türk') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Turkey").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇹🇷 *Türkiye İçin Sonuçlar:*\n😷 *Toplam Vaka:* ${resp.cases}\n🏥 *Günlük Hasta:* ${resp.todayCases}\n⚰️ *Toplam Ölü:* ${resp.deaths}\n☠️ *Günlük Ölü:* ${resp.todayDeaths}\n💊 *Toplam İyileşen:* ${resp.recovered}\n😷 *Aktif Vaka:* ${resp.active}\n🆘 *Ağır Hasta:* ${resp.critical}\n🧪 *Toplam Test:* ${resp.totalTests}`);
                });
            } catch (err) {
                await message.reply(`Bir Hata Oluştu, İşte Hata : \n${err.message}`, MessageType.text)
            }

        }
        else if (match[1] === "usa" || match[1] === "Usa" || match[1] === "USA" || match[1] === "america" || match[1] === "America") {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/USA").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇺🇲 *Datas for USA:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "de" || match[1] === "De" || match[1] === "DE" || match[1] === "Germany" || match[1] === "germany" || match[1].includes('deutschland') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Germany").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇩🇪 *Daten für Deutschland:*\n😷 *Fälle İnsgesamt:* ${resp.cases}\n🏥 *Tägliche Fälle:* ${resp.todayCases}\n⚰️ *Totale Todesfälle:* ${resp.deaths}\n☠️ *Tägliche Todesfälle:* ${resp.todayDeaths}\n💊 *Insgesamt Wiederhergestellt:* ${resp.recovered}\n😷 *Aktuelle Fälle:* ${resp.active}\n🆘 *Kritische Fälle:* ${resp.critical}\n🧪 *Gesamttests:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "az" || match[1] === "AZ" || match[1] === "Az" || match[1].includes('azerbaycan') || match[1].includes('azeri') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Azerbaijan").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇦🇿 *Azərbaycan üçün məlumatlar:*\n😷 *Ümumi Baş Tutan Hadisə:* ${resp.cases}\n🏥 *Günlük Xəstə:* ${resp.todayCases}\n⚰️ *Ümumi Ölüm:* ${resp.deaths}\n☠️ *Günlük Ölüm:* ${resp.todayDeaths}\n💊 *Ümumi Sağalma:* ${resp.recovered}\n😷 *Aktiv Xəstə Sayı:* ${resp.active}\n🆘 *Ağır Xəstə Sayı:* ${resp.critical}\n🧪 *Ümumi Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "uk" || match[1] === "Uk" || match[1] === "UK" || match[1] === "United" || match[1].includes('kingdom') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/UK").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇬🇧 *Datas for UK:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "in" || match[1] === "ın" || match[1] === "In" || match[1] === "İn" || match[1] === "İN" ||  match[1] === "IN" || match[1] === "india" || match[1] === "India" || match[1].includes('indian') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/India").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇮🇳 *भारत के लिए डेटा:*\n😷 *कुल मामले:* ${resp.cases}\n🏥 *दैनिक मामले:* ${resp.todayCases}\n⚰️ *कुल मौतें:* ${resp.deaths}\n☠️ *रोज की मौत:* ${resp.todayDeaths}\n💊 *कुल बरामद:* ${resp.recovered}\n😷 *एक्टिव केस:* ${resp.active}\n🆘 *गंभीर मामले:* ${resp.critical}\n🧪 *कुल टेस्ट:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "cn" || match[1] === "Cn" || match[1] === "CN" || match[1].includes('china') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/China").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇨🇳 *Datas for China:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "gr" || match[1] === "Gr" || match[1] === "GR" || match[1].includes('greek') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Greece").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇬🇷 *Datas for Greece:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "fr" || match[1] === "Fr" || match[1] === "FR" || match[1].includes('france') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/France").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇫🇷 *Datas for France:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "jp" || match[1] === "Jp" || match[1] === "JP" || match[1].includes('japan') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Japan").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇯🇵 *Datas for Japan:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });
 
            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "kz" || match[1] === "Kz" || match[1] === "KZ" || match[1].includes('kazakistan') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Kazakhstan").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇰🇿 *Datas for Kazakhstan:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        }
        else if (match[1] === "pk" || match[1] === "Pk" || match[1] === "PK" || match[1].includes('pakistan') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Pakistan").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇵🇰 *Datas for Pakistan:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        } 
        else if (match[1] === "ru" || match[1] === "Ru" || match[1] === "RU" || match[1].includes('russia') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Russia").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇷🇺 *Datas for Russia:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        } 
        else if (match[1] === "id" || match[1] === "İd" || match[1] === "İD" || match[1] === "ıd" || match[1] === "Id" || match[1] === "ID" || match[1].includes('ındonesia') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Indonesia").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇮🇩 *Datas for Indonesia:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        } 
        else if (match[1] === "nl" || match[1] === "Nl" || match[1] === "NL" || match[1].includes('netherland') ) {
            try{
                const respo = await got("https://coronavirus-19-api.herokuapp.com/countries/Netherlands").then(async ok  => {
                    resp = JSON.parse(ok.body);
                    await message.reply(`🇳🇱 *Datas for Netherlands:*\n😷 *Total Cases:* ${resp.cases}\n🏥 *Daily Cases:* ${resp.todayCases}\n⚰️ *Total Deaths:* ${resp.deaths}\n☠️ *Daily Deaths:* ${resp.todayDeaths}\n💊 *Total Recovered:* ${resp.recovered}\n😷 *Active Cases:* ${resp.active}\n🆘 *Critical Cases:* ${resp.critical}\n🧪 *Total Test:* ${resp.totalTests}`);

                });

            } catch (err) {
                await message.reply(`Error : \n${err.message}`, MessageType.text)
            }
        } 
        else {
            return await message.client.sendMessage(
                message.jid,
                Clang.NOT,
                MessageType.text
            );
        }
    }));
