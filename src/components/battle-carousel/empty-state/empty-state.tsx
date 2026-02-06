'use client'

import MissingCharactersIcon from '@assets/icons/missing-characters';
import css from './empty-state.module.scss'


export default function EmptyState() {
  
  return (
    <div className={css.root}>
        <div className={css.container}>
          <div className={css.icon}>
            <MissingCharactersIcon  size={70} />
          </div>
          <div className={css.text}>
              <h3>There are no characters in this battle</h3>
          </div>
        </div>
        
    </div>
  );
}
