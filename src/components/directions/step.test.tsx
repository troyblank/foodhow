import React from 'react';
import { render } from '@testing-library/react';
import Chance from 'chance';
import { Step } from './step';

describe('Step', () => {
	const chance = new Chance();

	it('Should render.', () => {
		const text = chance.sentence();
		const { getByText } = render(<Step text={text} />);

		expect(getByText(text)).toBeTruthy();
	});

	it('Should render an optional step.', () => {
		const text = chance.sentence();
		const { getByText } = render(<Step text={text} type={'optional'} />);

		expect(getByText(text)).toBeTruthy();
	});
});
