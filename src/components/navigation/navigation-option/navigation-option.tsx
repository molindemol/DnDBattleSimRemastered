'use client'
import Link from 'next/link';
import css from './navigation-option.module.scss'
import { Option } from '@constants/navigation-options';

interface NavigationOptionProps{
   option: Option;
   isActive: boolean;
}

export default function NavigationOption(props : NavigationOptionProps) {
  const {option, isActive} = props;
  const {href, icon, label} = option;
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`${css.root} ${isActive ? css.active : ''}`}
    >
      <span className={css.circle}>{icon}</span>
      <span className={css.label}>{label}</span>
    </Link>
  );
}
