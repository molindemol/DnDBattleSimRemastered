export default interface EnemyJson{
    race: string;
    image: string;
    initiative: number;
    hp: number;
}

export interface CustomEnemy extends EnemyJson {
    id: string;
}
