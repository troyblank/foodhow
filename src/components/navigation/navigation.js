import React from 'react';
import Link from 'next/link';
import './navigation.scss';

export default function Navigation() {
    return (
      <nav className={'navigation'}>
        <div className={'navigation__wrapper'}>
          <Link href={'/'}>
            <a>Home</a>
          </Link>
          <Link href={'/guide'} prefetch={true}>
            <a>Guide</a>
          </Link>
          <Link href={'/shoppinglist'} prefetch={true}>
            <a>hopping List</a>
          </Link>
        </div>
      </nav>
    );
}
