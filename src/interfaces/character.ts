import { StaticImageData } from "next/image";

export default interface Character {
    id: string;
    name: string;
    image: string | StaticImageData;
    initiativeRoll: number | null;
    initiativeBonus: number | null;
    hp?: number;
    ally?: boolean;
}
