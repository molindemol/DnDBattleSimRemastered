'use client'
import css from './rolls.module.scss';
import { UseCharactersHook } from "@hooks/use-characters";
import RollCharacterCard from "./roll-character-card/roll-character-card";
import { ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Character from '@interfaces/character';
import { getBaseName, getNameNumber, numberedName } from '@utils/character-names';

interface RollsProps{
    variant: "players" | "enemies";
    useCharactersHook: UseCharactersHook; 
}

export default function Rolls(props : RollsProps): ReactNode{
    const {variant, useCharactersHook} = props
    const { characters, updateCharacters, removeCharacters } = useCharactersHook
    const router = useRouter()

    const handleRemoveAndRenumber = useCallback((id: string) => {
        const removedCharacter = characters.find(c => c.id === id)
        if (!removedCharacter) return
        removeCharacters(id)

        const baseName = getBaseName(removedCharacter.name)
        const relatedCharacters = characters
            .map(c => ({ character: c, number: getNameNumber(c.name, baseName) }))
            .filter((entry): entry is { character: Character, number: number } =>
                entry.character.id !== id && entry.number !== null)
            .sort((a, b) => a.number - b.number)

        relatedCharacters.forEach(({ character }, index) => {
            const newName = numberedName(baseName, index + 1)
            if (character.name !== newName) {
                updateCharacters(character.id, { name: newName })
            }
        })
    }, [characters, removeCharacters, updateCharacters])

    const handleClick = useCallback(() => {
        router.push(variant === 'enemies' ? '/battle' : '/enemyrolls');
    },[router, variant])
    
    return (
    <div className={css.root}>
        <div className={css.charactersContainer}>
            {characters.map((character) => (<RollCharacterCard key={character.id} character={character} updateCharacters={updateCharacters} removeCharacters={handleRemoveAndRenumber}  variant={variant} />))}
            
        </div>
        <div className={css.bottom}>
            {variant === 'players' && (
                <p>
                    Players with no rolls will not participate in this battle but can be added when needed
                </p>
            )}
            
            <button onClick={handleClick} className={css.startButton}>
                Confirm Rolls
            </button>
        </div>
    </div>
    )
}