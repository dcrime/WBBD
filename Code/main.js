// const { client } = require("./global");

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

    if (token == null) {
        // @ts-ignore
        loginButton.onclick = () => { login(tokenValue.value) }
    } else {
        // @ts-ignore
        botLogin(tokenValue.value).then(confirm => {
            if (confirm) {
                start(), document.getElementById('loginScreen').style.display = 'none'
            } else {
                loginButton.animate([
                    { backgroundColor: '#333333' },
                    { backgroundColor: '#330000' },
                    { backgroundColor: '#333333' }
                ], { duration: 300, iterations: 2 });
                console.log('Incorrect token')
            }
        })
    }
}

window.onload = () => { login(null) };
