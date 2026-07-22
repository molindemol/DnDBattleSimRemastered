"use client"
import { ReactNode, useCallback } from "react";
import css from './add-player-button.module.scss'
import DefaultUserImage from '@assets/user.png'
import Character from "@interfaces/character";

interface AddPlayerButtonProps {
    addCharacters: (character: Character) => void
}

export default function AddPlayerButton(props : AddPlayerButtonProps): ReactNode{
    const {addCharacters} = props;
    

    const handleClick = useCallback(() => {
        addCharacters({ id: crypto.randomUUID(), name: "", image: DefaultUserImage, initiativeRoll: null, ally: true, initiativeBonus: null })
    },[addCharacters])
    return (
    <button onClick={handleClick} className={css.root}>
        <h1>+</h1>
    </button>
    )
}