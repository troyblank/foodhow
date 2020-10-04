import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Chance from 'chance';
import Directions from './directions';

describe('Directions', () => {
    const chance = new Chance();
    const directions = [
        { text: chance.word() },
        { text: chance.word(), type: 'optional' },
        [
            { text: chance.word() },
            { text: chance.word() }
        ]
    ];

    it('should render', () => {
        const wrapper = shallow(<Directions steps={directions} />);

        assert.isTrue(wrapper.find('Step').length === 2);
        assert.isTrue(wrapper.find('Directions').length === 1);
    });
});
