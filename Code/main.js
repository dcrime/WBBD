// const { client, createElement } = require("./global");

// const { bot } = require("./global")

// @ts-check

let globals = {
    guild: null,
    chan: null,
    intents: {
        members: false,
        presences: true,
        setting: 4
    },
}

async function start() {
    userCard()
    // await bot.fetchApplication()
    let left = document.getElementById('left'),
        homeSep = document.getElementById('home-sep')

    displayGuild(10, homeSep, left)
}

function userCard() {
    document.getElementById('userNick').innerText = bot.user.username
    document.getElementById('userTag').innerText = `#${bot.user.discriminator}`
    document.getElementById('userImg').src = bot.user.avatarURL()
    globals.intents.members = flags.has(Intents.FLAGS.GUILD_MEMBERS)
    globals.intents.presences = flags.has(Intents.FLAGS.GUILD_PRESENCES)
}

function login(token = null) {
    let tokenValue = document.getElementById('loginToken')
    let loginButton = document.getElementById('loginButton')
    let saved = false;

    if (token == null) {
        // @ts-ignore
        loginButton.onclick = () => { login(tokenValue.value) }
    } else {
        loginButton.onclick == undefined ? (
            showNotif('Saved Credentials', [
                { type: 'infoDefault', content: 'Logging in with saved credentials!' }
            ]), saved = true
        ) : showNotif('Token received', [
            { type: 'infoDefault', content: 'Token received, trying to log in!' }
        ])
        // @ts-ignore
        botLogin(token).then(confirm => {
            switch (confirm.info) {
                case 3:
                    changeIntent(globals.intents.setting--)
                    login(token)
                    break;
                case 2:
                    start(), document.getElementById('loginScreen').style.display = 'none'
                    showNotif('Login Successful', [
                        { type: 'infoDefault', content: 'You have logged into the bot' },
                        { type: 'infoDefault', content: `MEMBERS: ${globals.intents.members}\nPRESENCES: ${globals.intents.presences}` }
                        // @ts-ignore
                    ]), !saved && localStorage.setItem('token', token)
                    break;
                case 1:
                    showNotif('Invalid Token', [
                        { type: 'infoDefault', content: 'The token you entered is invalid' },
                        { type: 'infoDefault', content: 'Please check if you misspelled the token' },
                    ])
                    break;
                case 0:
                    showNotif('Invalid Token format', [
                        { type: 'infoDefault', content: 'The formatting of the token you entered is invalid' },
                        { type: 'infoDescBold', content: 'EXAMPLE:' },
                        { type: 'infoSmall', content: confirm.randToken }
                    ])
                    break;

                default:
                    console.log(confirm.e)
                    showNotif('Unknown Error', [
                        { type: 'infoDefault', content: confirm.e },
                    ])
                    break;
            }
            confirm.err && loginButton.animate([
                { backgroundColor: '#333333' },
                { backgroundColor: '#330000' },
                { backgroundColor: '#333333' }
            ], { duration: 300, iterations: 1 }), login(null)
        })
    }
}

function showNotif(title, contents) {
    let notificationPlaceholder = document.getElementById('notificationPlaceholder')
    let infoBox = createElement('div', { id: 'infoBox' })
    infoBox.appendChild(createElement('div', { id: 'infoSVG' }))

    let infoTitle = createElement('div', { id: 'infoTitle' })
    infoTitle.innerText = title

    infoBox.appendChild(infoTitle)
    for (let elem of contents) {
        let desc = createElement('div', { id: elem.type })
        desc.innerText = elem.content
        infoBox.appendChild(desc)
    }

    notificationPlaceholder.insertBefore(infoBox, notificationPlaceholder.firstChild);
    setTimeout(() => { notificationPlaceholder.removeChild(infoBox) }, 3e3)
}

function setup() {
    document.getElementById('channelPlaceholder').removeChildren()
    changeIntent(globals.intents.setting)
    login(localStorage.getItem('token'))
}

window.onload = () => { setup() };