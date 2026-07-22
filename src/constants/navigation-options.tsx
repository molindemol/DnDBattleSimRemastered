import BattleIcon from "@assets/icons/battle-icon";
import DiceEnemyIcon from "@assets/icons/dice-enemy-icon";
import DiceUserIcon from "@assets/icons/dice-user-icon";
import UserIcon from "@assets/icons/user-icon";
import { Url } from "next/dist/shared/lib/router/router";
import {JSX } from "react";

export interface Option{
    id : string;
    icon: JSX.Element;
    href: Url;
}

export const NAVIGATION_OPTIONS: Option[] = [
    {
        id: 'player_select',
        icon: (<UserIcon />),
        href: '/'
    },
    {
        id: 'player_rolls',
        icon: (<DiceUserIcon />),
        href: '/playerrolls'
    },
    {
        id: 'enemy_rolls',
        icon: (<DiceEnemyIcon />),
        href: '/enemyrolls'
    },
    {
        id: 'battle',
        icon: (<BattleIcon />),
        href: '/battle'
    },
]