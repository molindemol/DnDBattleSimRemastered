'use client'
import { ReactNode, useState } from "react";
import css from './enemy-select.module.scss'

import { UseCharactersHook } from "@hooks/use-characters";
import useCustomEnemies from "@hooks/use-custom-enemies";

import enemyData from '@assets/enemyData.json'
import EnemyJson from "@interfaces/enemy-json";
import EnemySelectCard from "./enemy-select-card/enemy-select-card";
import AddEnemyModal from "./add-enemy-modal/add-enemy-modal";

interface EnemySelectProps{
    useCharactersHook: UseCharactersHook;
}

export default function EnemySelect(props :  EnemySelectProps): ReactNode{
    const {useCharactersHook} = props
    const { characters: enemies, addCharacters } = useCharactersHook
    const { customEnemies, addCustomEnemy, removeCustomEnemy } = useCustomEnemies()
    const enemiesJson : EnemyJson[] = enemyData
    const [searchQuery, setSearchQuery] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)

    const matchesSearch = (enemy: EnemyJson) =>
        enemy.race.toLowerCase().includes(searchQuery.toLowerCase())

    const filteredCustomEnemies = customEnemies.filter(matchesSearch)
    const filteredCampaignEnemies = enemiesJson.filter(matchesSearch)

    return (
    <div className={css.root}>
        <input
            type="text"
            placeholder="Search enemies by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={css.searchInput}
        />
        <div className={css.container}>
            <button onClick={() => setShowAddModal(true)} className={css.addButton}>
                + Custom enemy
            </button>
            {filteredCustomEnemies.map(enemy => (
                <EnemySelectCard
                    key={enemy.id}
                    enemy={enemy}
                    enemies={enemies}
                    addEnemy={addCharacters}
                    onRemove={() => removeCustomEnemy(enemy.id)}
                />
            ))}
            {filteredCampaignEnemies.map(enemy => (
                <EnemySelectCard key={enemy.race} enemy={enemy} enemies={enemies} addEnemy={addCharacters} />
            ))}
        </div>
        <AddEnemyModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onAdd={(enemy) => {
                addCustomEnemy(enemy)
                setShowAddModal(false)
            }}
        />
    </div>
    )
}
