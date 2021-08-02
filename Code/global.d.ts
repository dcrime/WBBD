import Discord from 'discord.js'

type KeysOfType<A, T> = {
  [K in keyof A]: A[K] extends T ? K : never
}[keyof A]

type PickWithType<A, T> = Pick<A, KeysOfType<A, T>>

declare function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  options: Partial<PickWithType<HTMLElementTagNameMap[T], string>>
): HTMLElementTagNameMap[T] {
  return Object.assign(document.createElement(tag), options)
}

declare interface Element {
  assignClasses(classArray: Array<string>): HTMLElement,
  appendChildren(...childArray: Array<HTMLElement>): HTMLElement,
  removeChildren(): HTMLElement
};

declare function botLogin(token: string): Promise<boolean>

declare let bot: Discord.Client

//createElement('img', { src: "link" });
