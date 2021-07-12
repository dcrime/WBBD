// const { client, createElement } = require("./global");

// @ts-check
function displayGuild(amount, homeSep, left) {
    let i = 0;
    const initChannels = (category, guild) => {
        category.innerHTML = ''
        const channels = guild.channels.cache
        let tmp = { NoCategory: {}, InCategory: {} },
            sortedChannels = []
        channels.filter(ch => ch.type !== 'category').forEach(c => { // Needs changes
            if (!c.parent) tmp.NoCategory[c.position] = c
            else {
                if (!tmp.InCategory[c.parent.position]) {
                    tmp.InCategory[c.parent.position] = {
                        self: c.parent
                    }
                }
                tmp.InCategory[c.parent.position][c.position] = c
            }
        })
        console.log(channels.map(c => c.name).join('\n'), tmp)
        sortObject(tmp.NoCategory, (_obj, channels) => {
            channels.forEach(([,ch]) => sortedChannels.push(ch)) // I'm sure there's a way to make this look better
        })
        sortObject(tmp.InCategory, (_obj, categories) => { // Along with this
            categories.forEach(([,ca]) => {
                sortedChannels.push(ca.self)
                sortObject(ca, (_obj, channels) => {
                    channels.forEach(([,ch]) => ch.type !== 'category' && sortedChannels.push(ch))
                })
            })
        })
        console.log(sortedChannels)
        sortedChannels.forEach(ch => {
            if (ch.type === 'category') {
                const categoryExpand = createElement('div'),
                    categoryName = createElement('div')

                categoryExpand.classList.add('categoryExpanded')
                categoryName.classList.add('categoryName')

                categoryExpand.innerText = '^'
                categoryName.innerText = ch.name.toUpperCase()
                // categoryExpand.onclick(() => {})

                appendChildren(category, [categoryExpand, categoryName])
            } else {
                const channel = createElement('div'),
                    channelType = createElement('div'),
                    channelName = createElement('div')

                channel.classList.add('channel')
                channelType.classList.add('channelType')
                channelName.classList.add('channelName')

                channelType.innerText = '#'
                channelName.innerText = ch.name

                category.innerHTML += '\n'

                category.appendChild(appendChildren(channel, [channelType, channelName]))
            }
        })
    }
    // @ts-ignore
    bot.guilds.cache.forEach(g => {
        let guild = createElement('div', {
            onclick: () => {
                console.log(`Guild selected: ${g.id}`)
                const recentGuild = document.querySelector('.guildSelected'),
                    category = document.getElementById('category')
                if (!recentGuild) {
                    guild.classList.add('guildSelected')
                    initChannels(category, g)
                } else if (recentGuild && recentGuild.id !== g.id) {
                    recentGuild.classList.remove('guildSelected')
                    guild.classList.add('guildSelected')
                    initChannels(category, g)
                }
            }
        });

        guild.classList.add('guild')
        guild.id = g.id
        guild.style.top = `${homeSep.offsetTop + 13 + (i) * 65}px`

        let guildAcronym = createElement('div', {});
        guildAcronym.classList.add('guildAcronym')
        guildAcronym.innerText = g.nameAcronym

        guild.appendChild(guildAcronym)
        left.appendChild(guild)
        i++;
    });
}

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
