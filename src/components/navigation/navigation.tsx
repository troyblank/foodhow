import React, { FunctionComponent } from 'react'
import Link from 'next/link';

export const Navigation: FunctionComponent = () => {
    return (
      <nav className={'navigation'}>
        <div className={'navigation__wrapper'}>
            <Link href={'/'} className={'navigation__home'}>
                home
            </Link>
            <Link href={'/guide'} prefetch={true} className={'navigation__guide'}>
                guide
            </Link>
            <Link href={'/shoppingList'} prefetch={true} className={'navigation__list'}>
                list
            </Link>
        </div>
      </nav>
    );
}
