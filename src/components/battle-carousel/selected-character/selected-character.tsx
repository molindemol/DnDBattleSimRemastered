'use client'
import Character from '@interfaces/character';
import css from './selected-character.module.scss'
import CharacterImage from '@components/character-image/character-image';

interface SelectedCharacterProps{
  character: Character;
  updateCharacters: (id: string, changes: Partial<Character>) => void;
}

export default function SelectedCharacter(props: SelectedCharacterProps) {
  const {character, updateCharacters } = props;
  const {id, name, image, ally, hp} = character

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(value)) return;
    updateCharacters(id, { hp: value });
  }

  return (
    <div className={css.root}>
        <CharacterImage className={css.image} image={image} name={name} />
        <div className={css.bottom}>
          <h1 className={css.name}>{name}</h1>

            {!ally && (
              <div className={css.health}>
                <label>HP</label>
                <input type="number" min={0} value={hp ?? 0} onChange={handleHpChange} />
              </div>
            )}

        </div>
    </div>
  );
}
