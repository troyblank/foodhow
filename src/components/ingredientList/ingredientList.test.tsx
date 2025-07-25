import React from 'react';
import { render } from '@testing-library/react';
import Chance from 'chance';
import { IngredientList } from '.';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockImplementation(() => ({
        shoppingList: []
    }))
}));

describe('IngredientList', () => {
    const chance = new Chance();
    const title = chance.word();
    const ingredients = [chance.word({ syllables: 3 }), chance.word({ syllables: 2 }), chance.word({ syllables: 4 })];

    it('should render', () => {
        const { getByText } = render(<IngredientList
          fileName={chance.word()}
          title={title}
          ingredients={ingredients}
        />);

        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(ingredients[0])).toBeInTheDocument();
        expect(getByText(ingredients[1])).toBeInTheDocument();
        expect(getByText(ingredients[2])).toBeInTheDocument();
    });

    it('should render without a title', () => {
        const { queryByRole } = render(<IngredientList
          fileName={chance.word()}
          title={null}
          ingredients={ingredients}
        />);

        expect(queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
    });
});
