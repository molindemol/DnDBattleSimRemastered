'use client'
import { ReactNode, useCallback } from "react";
import css from './enemy-select-card.module.scss'
import EnemyJson from "@interfaces/enemy-json";
import Character from "@interfaces/character";
import DefaultUserImage from '@assets/user.png'
import TrashIcon from "@assets/icons/trash-icon";
import { nextAvailableName } from "@utils/character-names";

interface EnemySelectCardProps{
    enemy: EnemyJson;
    enemies: Character[];
    addEnemy: (c: Character) => void;
    onRemove?: () => void;
}

export default function EnemySelectCard(props: EnemySelectCardProps): ReactNode{
    const {enemy, enemies, addEnemy, onRemove} = props
    const {race: name} = enemy

    const handleClick = useCallback(() => {
        addEnemy({
            id: crypto.randomUUID(),
            name: nextAvailableName(enemy.race, enemies.map(e => e.name)),
            hp: enemy.hp,
            image: enemy.image || DefaultUserImage,
            initiativeRoll: null,
            initiativeBonus: enemy.initiative,
            ally: false
        })
    }, [addEnemy, enemy, enemies])

    if (onRemove) {
        return (
            <div className={css.customRoot}>
                <button onClick={handleClick} className={css.customAdd}>
                    {name}
                </button>
                <button onClick={onRemove} className={css.customRemove} aria-label={`Delete ${name}`}>
                    <TrashIcon size={16} />
                </button>
            </div>
        )
    }

    return (
        <button onClick={handleClick} className={css.root}>
            {name}
        </button>
    )
}
