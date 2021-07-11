// const { client, createElement } = require("./global");

// @ts-check
globalThis.createElement = (tag, options) => {
    return Object.assign(document.createElement(tag), options);
}

function displayGuild(amount, homeSep, left) {
    let i = 0;
    // @ts-ignore
    bot.guilds.cache.forEach(g => {
        let guild = createElement('div', {});

        guild.classList.add('guild')
        guild.style.top = `${homeSep.offsetTop + 13 + (i) * 65}px`

        let guildAcronym = createElement('div', {});
        guildAcronym.classList.add('guildAcronym')
        guildAcronym.innerText = g.nameAcronym

        guild.appendChild(guildAcronym)
        left.appendChild(guild)
        i++;
    });
}

// function displayGuild(amount, homeSep, left) {
//     for (let i = 0; i < amount; i++) {
//         let guild = createElement('div', {
//             // @ts-ignore
//             onclick: () => { homeColor(guild) },
//             style: {
//                 color: 'black'
//             }
//         });
//         guild.classList.add('guild')
//         guild.style.top = `${homeSep.offsetTop + 13 + (i) * 65}px`

//         let guildAcronym = createElement('div', {});
//         guildAcronym.classList.add('guildAcronym')

//         guild.appendChild(guildAcronym)
//         left.appendChild(guild)
//     }
// }

function start() {
    let left = document.getElementById('left'),
        homeSep = document.getElementById('home-sep')

    displayGuild(10, homeSep, left)
}

function login(token = null) {
    let tokenValue = document.getElementById('loginToken')
    let loginButton = document.getElementById('loginButton')
    let errorBox = document.getElementById('errorBox')
    let i = 0;


    if (token == null) {
        // @ts-ignore
        loginButton.onclick = () => { login(tokenValue.value) }
    } else {
        // @ts-ignore
        botLogin(tokenValue.value).then(confirm => {
            switch (confirm.info) {
                case 2:
                    start(), document.getElementById('loginScreen').style.display = 'none'
                    showNotif('Login Successful', [
                        { type: 'infoDefault', content: 'You have logged into the bot' },
                    ])
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
                    showNotif('Unknown Error', [
                        { type: 'infoDefault', content: confirm.e },
                    ])
                    break;
            }

            loginButton.animate([
                { backgroundColor: '#333333' },
                { backgroundColor: '#330000' },
                { backgroundColor: '#333333' }
            ], { duration: 300, iterations: 1 })
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

window.onload = () => { login(null) };
