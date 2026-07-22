'use client'
import { ReactNode, useCallback, useState } from "react";
import css from './add-player-card.module.scss'
import Image from 'next/image'
import TrashIcon from '@assets/icons/trash-icon'
import ImageModal from './image-modal/image-modal'
import Character from "@interfaces/character";

interface PlayerCardProps {
    player: Character;
    removeCharacters: (id: string) => void;
    updateCharacters: (id: string, changes: Partial<Character>) => void;
}

export default function AddPlayerCard(props: PlayerCardProps): ReactNode{
    const {player, removeCharacters, updateCharacters} = props;
    const {name, image} = player
    const [showModal, setShowModal] = useState(false)

    const handleDelete = useCallback(() => {
        removeCharacters(player.id)
    },[removeCharacters, player.id])

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        updateCharacters(player.id, { name: e.target.value })
    },[updateCharacters, player.id])

    const handleImageButtonClick = useCallback(() => {
        setShowModal(true)
    },[])

    const handleConfirmImage = useCallback((imageUrl: string) => {
        updateCharacters(player.id, { image: imageUrl })
        setShowModal(false)
    },[updateCharacters, player.id])

    return (
    <>
        <div className={css.root}>
            <Image className={css.image} alt={`${name} image`} src={image} width={2000} height={2000} />
            <input type="text" placeholder="name" value={name} onChange={handleNameChange} />
            <button onClick={handleImageButtonClick} className={css.imageButton}>Change Image</button>
            <button onClick={handleDelete} className={css.remove} aria-label={`Remove ${name}`}><TrashIcon /></button>
        </div>
        <ImageModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
            onConfirm={handleConfirmImage}
            initialImage={typeof image === 'string' ? image : ''}
        />
    </>
    )
}