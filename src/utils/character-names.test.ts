import { describe, expect, test } from 'vitest'
import { getBaseName, getNameNumber, nextAvailableName, numberedName } from './character-names'

describe('getBaseName', () => {
    test('strips a trailing number', () => {
        expect(getBaseName('Boar 2')).toBe('Boar')
        expect(getBaseName('Boar 12')).toBe('Boar')
    })

    test('keeps names without a number intact', () => {
        expect(getBaseName('Boar')).toBe('Boar')
        expect(getBaseName('Anchorite of Talos')).toBe('Anchorite of Talos')
    })
})

describe('getNameNumber', () => {
    test('treats the bare base name as number 1', () => {
        expect(getNameNumber('Boar', 'Boar')).toBe(1)
    })

    test('reads the trailing number', () => {
        expect(getNameNumber('Boar 3', 'Boar')).toBe(3)
    })

    test('returns null when a different base only shares a prefix', () => {
        expect(getNameNumber('Twig Blight', 'Twig')).toBeNull()
        expect(getNameNumber('Boarhound', 'Boar')).toBeNull()
    })
})

describe('nextAvailableName', () => {
    test('uses the bare name when it does not exist yet', () => {
        expect(nextAvailableName('Boar', [])).toBe('Boar')
        expect(nextAvailableName('Boar', ['Banshee'])).toBe('Boar')
    })

    test('numbers the second copy', () => {
        expect(nextAvailableName('Boar', ['Boar'])).toBe('Boar 2')
    })

    test('never collides after a copy in the middle was removed', () => {
        expect(nextAvailableName('Boar', ['Boar', 'Boar 3'])).toBe('Boar 4')
    })

    test('ignores names that only share a prefix', () => {
        expect(nextAvailableName('Boar', ['Boarhound'])).toBe('Boar')
    })
})

describe('numberedName', () => {
    test('first position has no number', () => {
        expect(numberedName('Boar', 1)).toBe('Boar')
    })

    test('later positions are numbered', () => {
        expect(numberedName('Boar', 2)).toBe('Boar 2')
        expect(numberedName('Boar', 10)).toBe('Boar 10')
    })
})
