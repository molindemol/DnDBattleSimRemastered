'use client'
import { ReactNode, useCallback, useState } from "react";
import css from './add-enemy-modal.module.scss'
import Image from 'next/image'
import { CustomEnemy } from "@interfaces/enemy-json";

interface AddEnemyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (enemy: CustomEnemy) => void;
}

export default function AddEnemyModal(props: AddEnemyModalProps): ReactNode {
    const { isOpen, onClose, onAdd } = props
    const [name, setName] = useState('')
    const [hp, setHp] = useState('')
    const [initiative, setInitiative] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [isDragOver, setIsDragOver] = useState(false)

    const resetForm = useCallback(() => {
        setName('')
        setHp('')
        setInitiative('')
        setImageUrl('')
    }, [])

    const handleFileConversion = useCallback((file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            setImageUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files.length > 0) {
            handleFileConversion(e.dataTransfer.files[0])
        }
    }, [handleFileConversion])

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            handleFileConversion(e.target.files[0])
        }
    }, [handleFileConversion])

    const handleClose = useCallback(() => {
        resetForm()
        onClose()
    }, [onClose, resetForm])

    const isValid = name.trim() !== '' && hp !== ''

    const handleAdd = useCallback(() => {
        if (!isValid) return
        onAdd({
            id: crypto.randomUUID(),
            race: name.trim(),
            hp: Number(hp),
            initiative: initiative === '' ? 0 : Number(initiative),
            image: imageUrl,
        })
        resetForm()
    }, [isValid, onAdd, name, hp, initiative, imageUrl, resetForm])

    if (!isOpen) return null

    return (
        <div className={css.modalOverlay} onClick={handleClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <h2>Add Custom Enemy</h2>
                <div className={css.fields}>
                    <div className={css.field}>
                        <label htmlFor="customEnemyName">Name</label>
                        <input
                            id="customEnemyName"
                            type="text"
                            placeholder="Cave Troll"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={css.numberRow}>
                        <div className={css.field}>
                            <label htmlFor="customEnemyHp">HP</label>
                            <input
                                id="customEnemyHp"
                                type="number"
                                min={0}
                                placeholder="84"
                                value={hp}
                                onChange={(e) => setHp(e.target.value)}
                            />
                        </div>
                        <div className={css.field}>
                            <label htmlFor="customEnemyInitiative">Initiative bonus</label>
                            <input
                                id="customEnemyInitiative"
                                type="number"
                                placeholder="0"
                                value={initiative}
                                onChange={(e) => setInitiative(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`${css.dropzone} ${isDragOver ? css.dragOver : ''}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    <p>Drag and drop an image here, or click to select (optional)</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className={css.fileInput}
                    />
                </div>
                {imageUrl && (
                    <div className={css.imagePreview}>
                        <Image src={imageUrl} alt="Preview" width={120} height={120} />
                    </div>
                )}
                <div className={css.modalButtons}>
                    <button onClick={handleAdd} className={css.confirmButton} disabled={!isValid}>Add enemy</button>
                    <button onClick={handleClose} className={css.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
