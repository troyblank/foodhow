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
        ));
    });
});
