# DnD Battle Simulator Remastered

DnD Battle Simulator Remastered is a turn-based battle simulator inspired by Dungeons & Dragons combat and the character action bar system from Baldur’s Gate.

The simulator visually displays both players and enemies in a structured combat interface, showing exactly when each character is able to perform an action. All enemies are predefined based on the official *Dragon of Icespire Peak* campaign, while players can be added by the user, including a custom character image.

## Features

- Predefined Enemies from Dragon of Icespire Peak  
  All enemies are based on the *Dragon of Icespire Peak* campaign.

- Custom Player Characters  
  Users can add their own player characters and assign a custom image to each character.

- Character Container Overview  
  All players and enemies are displayed together in a dedicated container.

- Current Character Display  
  A separate display highlights the character whose turn is currently active.

- Turn-Based Combat Flow  
  Characters can perform actions when their turn becomes active.

- Clear Visual Feedback  
  The interface clearly indicates whose turn it is at all times.

- DnD-Inspired Mechanics  
  Based on core DnD combat concepts such as initiative and turns.

## How It Works

1. The user starts on the player add screen, where they can create their player characters and assign images to each.
2. After adding players, the enemy selection screen appears. Enemies from the *Dragon of Icespire Peak* campaign are selected and their stats are loaded.
3. Initiative rolls are performed for all characters and enemies to determine the turn order.
4. The battle screen loads, showing all characters in a shared container.
5. The currently active character is displayed in a separate panel above the container.
6. When a character’s turn begins, the player or AI performs an action.
7. The display and turn order update dynamically as the battle progresses.


## Campaign Source

This simulator uses predefined enemy data from:

- *Dragon of Icespire Peak* (Dungeons & Dragons 5e)

The simulator aims to stay faithful to the campaign while giving users flexibility to customize their party.

## Project Status

This project is a work in progress. Planned or possible future features include:

- Additional campaigns and encounters  
- Import or add custom enemies
- Status effects such as stun, poison, or buffs  
- Spell and ability cooldowns   
- Visual improvements and animations

## Inspiration

- Dungeons & Dragons  
- Baldur’s Gate

## License

MIT