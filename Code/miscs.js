//const { client, createElement, assignClasses } = require("./global");

globalThis.createElement = (tag, options) => {
    return Object.assign(document.createElement(tag), options);
}
globalThis.assignClasses = (element, classArray) => {
    for(let className of classArray){ element.classList.add(className) }
    return element
}

globalThis.appendChildren = (element, childArray) => {
    for (let child of childArray) element.appendChild(child)
    return element
}

const sortObject = (object, func = (object, array) => {}, flip = false) => {
    if (typeof object !== 'object') return new Error(`object is required. got type ${typeof object}`)
    if (typeof func !== 'function') return new Error(`function is required. got type ${typeof func}`)
    // @ts-ignore
    const arr = Object.entries(object).sort((a, b) => a[0] - b[0])
    object = Object.fromEntries(flip ? arr.reverse() : arr)
    func(object, arr)
    return object
}
