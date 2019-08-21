import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Link from 'next/link';
import Navigation from './navigation';

describe('Navigation', () => {
    it('should render', () => {
        const wrapper = shallow(<Navigation />);

        assert.isTrue(wrapper.contains(
          <nav className={'navigation'}>
            <div className={'navigation__wrapper'}>
              <Link href={'/'}>
                <a className={'navigation__home'} />
              </Link>
              <Link href={'/guide'} prefetch={true}>
                <a className={'navigation__guide'} />
              </Link>
              <Link href={'/shoppingList'} prefetch={true}>
                <a className={'navigation__list'} />
              </Link>
            </div>
          </nav>
        ));
    });
});
