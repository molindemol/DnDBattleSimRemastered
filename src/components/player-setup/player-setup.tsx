'use client'
import { ReactNode, useCallback } from "react";
import css from './player-setup.module.scss'
import AddPlayerButton from "./add-player-button/add-player-button";
import AddPlayerCard from "./player-card/add-player-card";
import { useRouter } from "next/navigation";
import useCharacters from "@hooks/use-characters";


export default function PlayerSetup(): ReactNode{
    const { characters: players, addCharacters, removeCharacters, updateCharacters } = useCharacters("players")
    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push('/playerrolls');
    },[router])

    return (
    <div className={css.root}>
        <div className={css.playerContainer}>
            {players.map((player) => (<AddPlayerCard key={player.id} player={player} removeCharacters={removeCharacters} updateCharacters={updateCharacters} />))}
            <AddPlayerButton addCharacters={addCharacters} />
        </div>
        <button onClick={handleClick} className={css.startButton}>
            Start Rolls
        </button>
    </div>
    )
}