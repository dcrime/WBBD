type KeysOfType<A, T> = {
    [K in keyof A]: A[K] extends T ? K : never;
}[keyof A];

type PickWithType<A, T> = Pick<A, KeysOfType<A, T>>;


function createElement
    <T extends keyof HTMLElementTagNameMap>
    (
        tag: T,
        options: Partial<
            PickWithType<
                HTMLElementTagNameMap[T],
                string
            >
        >
    ): HTMLElementTagNameMap[T] {
    return Object.assign(document.createElement(tag), options);
}


//createElement('img', { src: "link" });