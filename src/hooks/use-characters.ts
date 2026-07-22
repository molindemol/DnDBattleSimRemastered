import { useState, useEffect, useCallback, useRef, Dispatch, SetStateAction } from "react";
import Character from "@interfaces/character";

export interface UseCharactersHook{
    characters: Character[];
    setCharacters: Dispatch<SetStateAction<Character[]>>;
    addCharacters: (c: Character) => void;
    removeCharacters: (id: string) => void;
    updateCharacters: (id: string, changes: Partial<Character>) => void;
    clearCharacters: () => void;
}

export default function useCharacters(storageKey : string): UseCharactersHook {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [initialized, setInitialized] = useState(false);
    const skipFirstSave = useRef(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) setCharacters(JSON.parse(raw));
        } catch (e) {
            console.warn('Failed to read Characters from localStorage', e);
        } finally {
            setInitialized(true);
        }

    }, [storageKey]);

    useEffect(() => {
        if (!initialized) return;
        if (typeof window === 'undefined') return;
        try {
            if (skipFirstSave.current) { skipFirstSave.current = false; return; }
            localStorage.setItem(storageKey, JSON.stringify(characters));
        } catch (e) {
            console.warn('Failed to save Characters to localStorage', e);
        }
    }, [characters, initialized, storageKey]);

    const addCharacters= useCallback((c: Character) => {
        setCharacters(prev => [...prev, c]);
    }, []);

    const removeCharacters= useCallback((id: string) => {
        setCharacters(prev => prev.filter(p => p.id !== id));
    }, []);

    const updateCharacters= useCallback((id: string, changes: Partial<Character>) => {
        setCharacters(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));
    }, []);

    const clearCharacters = useCallback(() => setCharacters([]), []);

    return { characters, setCharacters, addCharacters, removeCharacters, updateCharacters, clearCharacters } as const;
}
