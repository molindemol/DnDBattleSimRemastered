/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useEffect, useState } from 'react';
import Character from '@interfaces/character';
import css from './selected-character.module.scss'
import Image from 'next/image';

interface SelectedCharacterProps{
  character: Character;
  updateCharacters: (id: string, changes: Partial<Character>) => void;
}

export default function SelectedCharacter(props: SelectedCharacterProps) {
  const {character, updateCharacters } = props;
  const {id, name, image, ally, hp} = character

  const [currentHp, setCurrentHp] = useState<number>(hp ?? 0);

  useEffect(() => {
       setCurrentHp(hp ?? 0);
  }, [hp]);

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(value)) return;
    setCurrentHp(value);
    updateCharacters(id, { hp: value });
  } 

  return (
    <div className={css.root}>
        <Image className={css.image} alt={`${name} image`} src={image} width={2000} height={2000} />
        <div className={css.bottom}>
          {name.length > 15 ? (<h2>{name}</h2>) : ( <h1>{name}</h1>) }
         
            {!ally && (
              <div className={css.health}>
                <label>HP:</label>
                <input type="number" min={0} value={currentHp} onChange={handleHpChange} />
              </div>
            )}
            
        </div>
    </div>
  );
}
