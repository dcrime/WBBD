//const { client, createElement, assignClasses } = require("./global");

globalThis.createElement = (tag, options) => {
    return Object.assign(document.createElement(tag), options)
}
Element.prototype.assignClasses = function (...classArray) {
    for (let className of classArray) { this.classList.add(className) }
    return this
}

Element.prototype.appendChildren = function (...childArray) {
    for (let child of childArray) this.appendChild(child)
    return this
}

Element.prototype.removeChildren = function () {
    while (this.children.length) this.removeChild(this.firstChild)
    return this
}

const sortObject = (object, func = (object, array) => { }, flip = false) => {
    if (typeof object !== 'object') return new Error(`object is required. got type ${typeof object}`)
    if (typeof func !== 'function') return new Error(`function is required. got type ${typeof func}`)
    // @ts-ignore
    const arr = Object.entries(object).sort((a, b) => a[0] - b[0])
    object = Object.fromEntries(flip ? arr.reverse() : arr)
    func(object, arr)
    return object
}
