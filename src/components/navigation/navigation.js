import React from 'react';
import Link from 'next/link';
import './navigation.scss';

export default function Navigation() {
    return (
      <nav className={'navigation'}>
        <div className={'navigation__wrapper'}>
          <Link href={'/'} className={'home'}>Home</Link>
          <Link href={'/guide'} className={'guide'}>Guide</Link>
          <Link href={'/shoppinglist'} class={'list'}>Shopping List</Link>
        </div>
      </nav>
    );
}
