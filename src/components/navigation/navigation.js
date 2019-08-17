import React from 'react';
import Link from 'next/link';
import './navigation.scss';

export default function Navigation() {
    return (
      <nav className={'navigation'}>
        <div className={'navigation__wrapper'}>
          <Link href={'/'}>
            <a className={'navigation__home'} />
          </Link>
          <Link href={'/guide'} prefetch={true}>
            <a className={'navigation__guide'} />
          </Link>
          <Link href={'/shoppinglist'} prefetch={true}>
            <a className={'navigation__list'} />
          </Link>
        </div>
      </nav>
    );
}
