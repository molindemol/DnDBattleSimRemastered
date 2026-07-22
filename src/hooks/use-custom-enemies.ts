import { useState, useEffect, useCallback } from "react";
import { CustomEnemy } from "@interfaces/enemy-json";

const STORAGE_KEY = 'customEnemies';

export interface UseCustomEnemiesHook {
    customEnemies: CustomEnemy[];
    addCustomEnemy: (enemy: CustomEnemy) => void;
    removeCustomEnemy: (id: string) => void;
}

export default function useCustomEnemies(): UseCustomEnemiesHook {
    const [customEnemies, setCustomEnemies] = useState<CustomEnemy[]>([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setCustomEnemies(JSON.parse(raw));
        } catch (e) {
            console.warn('Failed to read custom enemies from localStorage', e);
        } finally {
            setInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (!initialized) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(customEnemies));
        } catch (e) {
            console.warn('Failed to save custom enemies to localStorage', e);
        }
    }, [customEnemies, initialized]);

    const addCustomEnemy = useCallback((enemy: CustomEnemy) => {
        setCustomEnemies(prev => [enemy, ...prev]);
    }, []);

    const removeCustomEnemy = useCallback((id: string) => {
        setCustomEnemies(prev => prev.filter(e => e.id !== id));
    }, []);

    return { customEnemies, addCustomEnemy, removeCustomEnemy };
}
