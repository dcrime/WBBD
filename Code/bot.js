// @ts-check
const Discord = require('discord.js');
const randexp = require('randexp');
const bot = new Discord.Client()
/** @param {string} token */
let botLogin = async token => new Promise(async resolve => {
    let reg = RegExp('^[a-zA-Z0-9\\-_]{24}\\.[a-zA-Z0-9\\-_]{6}\\.[a-zA-Z0-9\\-_]{27}');
    /**
     * 0 - Invalid Token Format, Random Token
     * 1 - Invalid Token
     * 2 - Successful Login
     */
    console.log(new randexp(reg).gen())
    if(!token.match(reg)) return resolve({ err: true, info: 0, randToken: new randexp(reg).gen() });
    bot.login(token).catch(e => {resolve({ err: true, info: e.code == 'TOKEN_INVALID' ? 1 : 4, e })})

    bot.on('ready', () => {
        console.log(`Logged in as ${bot.user.tag}`)
        resolve({err: false, info: 2})
    });
})