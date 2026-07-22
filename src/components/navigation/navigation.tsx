'use client'
import { usePathname } from 'next/navigation';
import NavigationOption from './navigation-option/navigation-option';
import css from './navigation.module.scss'
import { NAVIGATION_OPTIONS } from '@constants/navigation-options';
import { useState } from 'react';


export default function Navigation() {
    const navigationOptions = NAVIGATION_OPTIONS;
    const pathName = usePathname()
    const activeOption = navigationOptions.find(option => option.href === pathName)
    const filteredOptions = navigationOptions.filter(option => option !== activeOption)

    const [showList, setShowList] = useState<boolean>(false)

    return (
        <nav className={`${css.root} ${showList ? css.open : ''}`}>
            {activeOption && (
                <button onClick={() => setShowList(!showList)} className={css.active} aria-label="Toggle navigation">
                    <NavigationOption isActive={true} option={activeOption} />
                </button>
            )}
            <div className={css.list}>
                {filteredOptions.map((option) => (
                    <div className={css.listItem} key={option.id}>
                        <NavigationOption isActive={false} option={option} />
                    </div>
                ))}
            </div>
        </nav>
    );
}
