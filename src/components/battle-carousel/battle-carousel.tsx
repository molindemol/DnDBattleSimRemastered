/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import useCharacters from '@hooks/use-characters';
import css from './battle-carousel.module.scss'
import BattleCard from './battle-card/battle-card';
import { useEffect, useState } from 'react';
import SelectedCharacter from './selected-character/selected-character';
import Character from '@interfaces/character';
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
        (a.initiativeRoll! + a.initiativeBonus!) -
        (b.initiativeRoll! + b.initiativeBonus!)
    )
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

  useEffect(() => {
    if (sortedListOfCharacters.length > 0) {
      setSelectedCharacter(sortedListOfCharacters[selectedIndex])
    }
  }, [sortedListOfCharacters, setSelectedCharacter, selectedCharacter, selectedIndex])

  if (!selectedCharacter) return <EmptyState />

  return (
    <div className={css.root}>
      
      <div className={css.battleScreen}>
          <SelectedCharacter
          character={selectedCharacter}
          updateCharacters={selectedCharacter.ally ? updatePlayers : updateEnemies}
          removeCharacters={selectedCharacter.ally ? removePlayers : removeEnemies}
        />
        <BattleControls currentIndex={selectedIndex} setIndex={setSelectedIndex} listLength={sortedListOfCharacters.length} />
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
