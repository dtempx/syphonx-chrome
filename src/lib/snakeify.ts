export function snakeify(key: string, delim = "_") {
    return key.replace(/[A-Z]/g, char => `${delim}${char.toLowerCase()}`)
}