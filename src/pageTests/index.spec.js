import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Index from '../../pages/index';
import { Head, Navigation } from '../components';

describe('Page - Index', () => {
    it('should render', () => {
        const wrapper = shallow(<Index />);

        assert.isTrue(wrapper.contains(
          <>
            <Head />
            <Navigation />
          </>
        ));
    });
});
