'use client'
import useCharacters from '@hooks/use-characters';
import css from './battle-carousel.module.scss'
import BattleCard from './battle-card/battle-card';
import { useEffect, useState } from 'react';
import SelectedCharacter from './selected-character/selected-character';
import BattleControls from './battle-controls/battle-controls';
import EmptyState from './empty-state/empty-state';

export default function BattleCarousel() {
  const { characters: players, updateCharacters: updatePlayers, removeCharacters: removePlayers } = useCharacters('players')
  const { characters: enemies, updateCharacters: updateEnemies, removeCharacters: removeEnemies } = useCharacters('enemies')
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const sortedListOfCharacters = players
    .filter(player => player.initiativeRoll !== null)
    .concat(enemies)
    .toSorted(
      (a, b) =>
        ((b.initiativeRoll ?? 0) + (b.initiativeBonus ?? 0)) -
        ((a.initiativeRoll ?? 0) + (a.initiativeBonus ?? 0))
    )
  const listLength = sortedListOfCharacters.length

  useEffect(() => {
    if (listLength === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % listLength);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + listLength) % listLength);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [listLength]);

  if (listLength === 0) return <EmptyState />

  // The list shrinks when a character dies, so the stored index can point past the end
  const safeIndex = selectedIndex % listLength
  const selectedCharacter = sortedListOfCharacters[safeIndex]

  return (
    <div className={css.root}>
      <div className={css.battleScreen}>
        <SelectedCharacter
          character={selectedCharacter}
          updateCharacters={selectedCharacter.ally ? updatePlayers : updateEnemies}
        />
        <BattleControls currentIndex={safeIndex} setIndex={setSelectedIndex} listLength={listLength} />
        <p className={css.keyboardHint}>Use the left and right arrow keys to switch turns</p>
        <div className={css.battleList}>
          {sortedListOfCharacters.map(character => (
            <BattleCard
              key={character.id}
              character={character}
              isSelected={character.id === selectedCharacter.id}
              updateCharacters={character.ally ? updatePlayers : updateEnemies}
              removeCharacters={character.ally ? removePlayers : removeEnemies}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
