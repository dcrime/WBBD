// @ts-check
const Discord = require('discord.js')
const bot = new Discord.Client()
/** @param {string} token */
let botLogin = async token => new Promise(async resolve => {
    let reg = RegExp('^[a-zA-Z0-9-_]{24}\.[a-zA-Z0-9-_]{6}\.[a-zA-Z0-9-_]{27}');
    
    token.match(reg) || resolve(false);
    (await bot.login(token)).length || resolve(false);

    bot.on('ready', () => {
        console.log(`Logged in as ${bot.user.tag}`)
        resolve(true)
    });
})