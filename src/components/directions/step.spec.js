import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Chance from 'chance';
import Step from './step';

describe('Step', () => {
    const chance = new Chance();
    const text = chance.sentence();

    it('should render', () => {
        const wrapper = shallow(<Step text={text} />);

        assert.isTrue(wrapper.find('li').exists());
        assert.isFalse(wrapper.find('li.direction-optional').exists());
    });

    it('should render an optional step', () => {
        const wrapper = shallow(<Step text={text} type={'optional'} />);

        assert.isTrue(wrapper.find('li').exists());
        assert.isTrue(wrapper.find('li.direction-optional').exists());
    });
});
