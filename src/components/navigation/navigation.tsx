'use client'
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import NavigationOption from './navigation-option/navigation-option';
import css from './navigation.module.scss'
import { NAVIGATION_OPTIONS } from '@constants/navigation-options';


export default function Navigation() {
    const pathName = usePathname()

    return (
        <nav className={css.root} aria-label="Battle steps">
            {NAVIGATION_OPTIONS.map((option, index) => (
                <Fragment key={option.id}>
                    {index > 0 && <span className={css.connector} aria-hidden="true" />}
                    <NavigationOption isActive={option.href === pathName} option={option} />
                </Fragment>
            ))}
        </nav>
    );
}
