import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Guide from '../../pages/guide';

describe('Page - Guide', () => {
    it('should render', () => {
        const wrapper = shallow(<Guide />);

        assert.isTrue(wrapper.contains(
          <div>
            <p>This is the guide.</p>
          </div>
        ));
    });
});
