export function createElement<T extends keyof HTMLElementTagNameMap>({
    tagName,
    id,
    className,
}: {
    tagName: T
    id?: string
    className?: string[]
}): HTMLElementTagNameMap[T] {
    const el = document.createElement(tagName) as HTMLElementTagNameMap[T]

    if (id) el.id = id
    if (className && className.length) {
        className.map((c) => el.classList.add(c))
    }

    return el
}
