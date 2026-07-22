'use client'
import { useCallback } from 'react';
import Character from '@interfaces/character';
import css from './battle-card.module.scss'
import Image from 'next/image';

interface BattleCardProps{
  character: Character;
  updateCharacters: (id: string, changes: Partial<Character>) => void;
  removeCharacters: (id: string) => void;
  isSelected: boolean;
}

export default function BattleCard(props: BattleCardProps) {
  const {character, updateCharacters, removeCharacters, isSelected } = props;
  const {id, name, image, ally, hp} = character

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(value)) return;
    updateCharacters(id, { hp: value });
  }

  const handleDead = useCallback(() => {
    if (ally){
        updateCharacters(id, {initiativeRoll: null})
    } else{
      removeCharacters(id)
    }
  },[removeCharacters, id, ally, updateCharacters])

  return (
    <div className={`${css.root} ${isSelected ? css.selected : ''}`}>
      <div>
        <Image className={css.image} alt={`${name} image`} src={image} width={2000} height={2000} />
        <p className={css.name}>{name}</p>
      </div>

        <div className={css.bottom}>
            {!ally && (
              <div className={css.health}>
                <label>HP</label>
                <input type="number" min={0} value={hp ?? 0} onChange={handleHpChange} />
              </div>
            )}
            <button onClick={handleDead}>Dead</button>
        </div>
    </div>
  );
}
