import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import GuidePage from '../../pages/guide';
import { Head, Navigation, Guide } from '../components';

describe('Page - Guide', () => {
    it('should render', () => {
        const wrapper = shallow(<GuidePage />);

        assert.isTrue(wrapper.contains(
          <>
            <Head />
            <Navigation />
            <Guide />
          </>
        ));
    });
});
