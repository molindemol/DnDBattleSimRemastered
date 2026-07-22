function escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function getBaseName(name: string): string {
    const match = name.match(/^(.+?)(?: \d+)?$/)
    return match ? match[1] : name
}

export function getNameNumber(name: string, baseName: string): number | null {
    if (name === baseName) return 1
    const match = name.match(new RegExp(`^${escapeRegExp(baseName)} (\\d+)$`))
    return match ? Number(match[1]) : null
}

export function nextAvailableName(baseName: string, existingNames: string[]): string {
    const numbers = existingNames
        .map(name => getNameNumber(name, baseName))
        .filter((n): n is number => n !== null)
    if (numbers.length === 0) return baseName
    return `${baseName} ${Math.max(...numbers) + 1}`
}

export function numberedName(baseName: string, position: number): string {
    return position <= 1 ? baseName : `${baseName} ${position}`
}
