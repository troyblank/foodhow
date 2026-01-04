import React from 'react';
import { render } from '@testing-library/react';
import Chance from 'chance';
import { mockShoppingItemType, TestWrapper } from '../../testing';
import { IngredientList } from '.';

describe('IngredientList', () => {
	const chance = new Chance();
	const title = chance.word();
	const ingredients = [
		{ text: chance.word({ syllables: 3 }), type: mockShoppingItemType() },
		{ text: chance.word({ syllables: 2 }), type: mockShoppingItemType() },
		{ text: chance.word({ syllables: 4 }), type: mockShoppingItemType() }
	];

	it('should render', () => {
		const { getByText } = render(<IngredientList
			fileName={chance.word()}
			title={title}
			ingredients={ingredients}
		/>, { wrapper: TestWrapper });

		expect(getByText(title)).toBeInTheDocument();
		expect(getByText(ingredients[0].text)).toBeInTheDocument();
		expect(getByText(ingredients[1].text)).toBeInTheDocument();
		expect(getByText(ingredients[2].text)).toBeInTheDocument();
	});

	it('should render without a title', () => {
		const { queryByRole } = render(<IngredientList
			fileName={chance.word()}
			title={null}
			ingredients={ingredients}
		/>, { wrapper: TestWrapper });

		expect(queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
	});
});
