'use client'
import { ReactNode, useState } from "react";
import Image, { StaticImageData } from 'next/image';
import EnemyIcon from "@assets/icons/enemy-icon";
import css from './character-image.module.scss'

interface CharacterImageProps {
    image: string | StaticImageData;
    name: string;
    className?: string;
}

// Renders a character portrait, falling back to an enemy icon
// when there is no image or the image fails to load
export default function CharacterImage(props: CharacterImageProps): ReactNode {
    const { image, name, className } = props;
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const src = typeof image === 'string' ? image : image.src;

    if (!src || failedSrc === src) {
        return (
            <span className={`${css.fallback} ${className ?? ''}`} role="img" aria-label={`${name} image`}>
                <EnemyIcon />
            </span>
        );
    }

    return (
        <Image
            className={className}
            alt={`${name} image`}
            src={image}
            width={2000}
            height={2000}
            onError={() => setFailedSrc(src)}
        />
    );
}
