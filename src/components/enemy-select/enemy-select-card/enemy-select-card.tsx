'use client'
import { ReactNode, useCallback } from "react";
import css from './enemy-select-card.module.scss'
import EnemyJson from "@interfaces/enemy-json";
import Character from "@interfaces/character";
import { nextAvailableName } from "@utils/character-names";

interface EnemySelectCardProps{
    enemy: EnemyJson;
    enemies: Character[];
    addEnemy: (c: Character) => void;
}

export default function EnemySelectCard(props: EnemySelectCardProps): ReactNode{
    const {enemy, enemies, addEnemy} = props
    const {race: name} = enemy

    const handleClick = useCallback(() => {
        addEnemy({
            id: crypto.randomUUID(),
            name: nextAvailableName(enemy.race, enemies.map(e => e.name)),
            hp: enemy.hp,
            image: enemy.image,
            initiativeRoll: null,
            initiativeBonus: enemy.initiative,
            ally: false
        })
    }, [addEnemy, enemy, enemies])

    return (
        <button onClick={handleClick} className={css.root}>
            {name}
        </button>
    )
}