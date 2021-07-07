window.api.receive("fromMain", (data) => {
    console.log(`Received ${data} from main process`);
});

// @ts-check
globalThis.createElement = (tag, options) => {
    return Object.assign(document.createElement(tag), options);
}
function displayGuild(amount, home, homeSep, left) {
    for (let i = 0; i < amount; i++) {
        let thingy = createElement('div', {
            onclick: () => { homeColor(thingy) },
            style: {
                color: 'black'
            }
        });
        thingy.classList.add('guild')
        thingy.style.top = `${homeSep.offsetTop + 13 + (i) * 65}px`
        left.appendChild(thingy)
    }
}

function start() {
    let left = document.getElementById('left'),
        right = document.getElementById('right'),
        home = document.getElementById('home'),
        homeSep = document.getElementById('home-sep'),
        serverNav = document.getElementById('server-nav')

    // home.onclick = () => { homeColor(home) }
    // window.api.send("toMain",
    //     ["leftH",
    //         left.style.height = `${window.innerHeight}px`]
    // );
    // window.api.send("toMain",
    //     ["rightH",
    //         right.style.height = `${window.innerHeight}px`]
    // );
    // window.api.send("toMain",
    //     ["serverNavH",
    //         serverNav.style.height = `${window.innerHeight}px`]
    // );
    // window.api.send("toMain",
    //     ["serverNavL",
    //         serverNav.style.left = `${left.offsetWidth}px`]
    // );
    // window.api.send("toMain",
    //     ["homeL",
    //         home.style.left = `${left.offsetWidth / 2 - home.offsetWidth / 2}px`]
    // );
    // window.api.send("toMain",
    //     ["HomeSepT",
    //         homeSep.style.top = `${home.offsetTop + 13}px`]
    // );
    // window.api.send("toMain",
    //     ["HomeSepL",
    //         homeSep.style.left = `${left.offsetWidth / 2 - homeSep.offsetWidth / 2}px`]
    // );
    displayGuild(10, home, homeSep, left)
}

function login(token = null) {
    tokenValue = document.getElementById('loginToken')
    loginButton = document.getElementById('loginButton')
    console.log(token)
    if (token == null) {
        loginButton.onclick = () => { login(tokenValue.value) }
    } else {
        start()
        document.getElementById('loginScreen').style.display = 'none'
    }
}

function homeColor(self) {
    console.log(self.style.backgroundColor)
    self.style.backgroundColor == 'black' ? self.style.backgroundColor = 'white' : self.style.backgroundColor = 'black'
}

window.onload = () => { login(null) };