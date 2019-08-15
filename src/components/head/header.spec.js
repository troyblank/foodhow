import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Head from 'next/head';
import HeadComponent from './head';

describe('Head', () => {
    it('should render', () => {
        const wrapper = shallow(<HeadComponent />);

        assert.isTrue(wrapper.contains(
          <Head>
            <meta httpEquiv={'Content-Type'} content={'text/html; charset=utf-8'} />
            <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
            <title>Food How</title>
          </Head>
        ));
    });
});
