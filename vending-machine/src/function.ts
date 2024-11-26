export function createElement({ tagName, id, className }: { tagName: keyof HTMLElementTagNameMap; id?: string; className?: string[] }) {
    const el = document.createElement(tagName)

    if (id) el.id = id
    if (className && className.length) {
        className.map((c) => el.classList.add(c))
    }

    return el
}
