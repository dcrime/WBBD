// @ts-check
let { setInterval, setTimeout, setImmediate } = require('timers')
const Discord = require('discord.js');
const { Intents } = Discord

const randexp = require('randexp');
let flags = new Discord.Intents(Object.values(Intents.FLAGS))
let bot

let changeIntent = (intent) => {
    let helper = (tmpFlags) => {
        for (let vals of tmpFlags) {
            let [flag, have] = vals
            let has = flags.has(flag)
            if (has && !have) flags.remove(flag)
            else if (!has && have) flags.add(flag)
        }
    }
    switch (intent) {
        case 4:
            helper([[Intents.FLAGS.GUILD_MEMBERS, true], [Intents.FLAGS.GUILD_PRESENCES, true]])
            break;
        case 3:
            helper([[Intents.FLAGS.GUILD_MEMBERS, true], [Intents.FLAGS.GUILD_PRESENCES, false]])
            break;
        case 2:
            helper([[Intents.FLAGS.GUILD_MEMBERS, false], [Intents.FLAGS.GUILD_PRESENCES, true]])
            break;
        case 1:
            helper([[Intents.FLAGS.GUILD_MEMBERS, false], [Intents.FLAGS.GUILD_PRESENCES, false]])
            break;
        default:
            break;
    }
    bot = new Discord.Client({ intents: flags })
}

/** @type {Discord.Guild} currentGuild*/
let currentGuild;
/** @type {Discord.Channel} currentChannel */
let currentChannel;

/** @param {string} token */
let botLogin = async (token) => new Promise(async resolve => {
    document.getElementById('loginButton').onclick = null
    let reg = RegExp('^[a-zA-Z0-9\\-_]{24}\\.[a-zA-Z0-9\\-_]{6}\\.[a-zA-Z0-9\\-_]{27}');
    /**
     * 0 - Invalid Token Format, Random Token
     * 1 - Invalid Token
     * 2 - Successful Login
     * 3 - Intent error
     */
    console.log(new randexp(reg).gen())
    if (!token.match(reg)) return resolve({ err: true, info: 0, randToken: new randexp(reg).gen() });
    bot.login(token).catch(e => { resolve({ err: true, info: e.code == 'TOKEN_INVALID' ? 1 : e.code == 'DISALLOWED_INTENTS' ? 3 : 4, e }) })

    bot.on('ready', () => {
        console.log(`Logged in as ${bot.user.tag}`)
        resolve({ err: false, info: 2 })
    });
})