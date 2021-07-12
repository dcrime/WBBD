import Discord from 'discord.js'

type KeysOfType<A, T> = {
  [K in keyof A]: A[K] extends T ? K : never
}[keyof A]

type PickWithType<A, T> = Pick<A, KeysOfType<A, T>>

function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  options: Partial<PickWithType<HTMLElementTagNameMap[T], string>>
): HTMLElementTagNameMap[T] {
  return Object.assign(document.createElement(tag), options)
}

function assignClasses(object: HTMLElement, classArray: array): HTMLElement
function appendChildren(object: HTMLElement, childArray: array): HTMLElement

function botLogin(token: string): Promise<boolean>

let bot: Discord.Client

//createElement('img', { src: "link" });
