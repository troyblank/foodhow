import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import RecipePage from '../../../pages/recipe/[recipe]';
import { Head, Navigation } from '../../components';

describe('Page - [Recipe]', () => {
    it('should render', () => {
        const wrapper = shallow(<RecipePage />);

        assert.isTrue(wrapper.contains(
          <>
            <Head />
            <Navigation />
            <div>hi i am a recipe: </div>
          </>
        ));
    });
});
