import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { Button } from './button';

describe('Button', () => {
	const chance = new Chance();

	it('should render', () => {
		const text = chance.word();

		const { getByText } = render(<Button text={text} buttonClickHand={jest.fn()} />);

		expect(getByText(text)).toBeInTheDocument();
	});

	it('should call the button handler when clicked', async () => {
		const text = chance.word();
		const buttonClickHand = jest.fn();

		const { getByRole } = render(<Button text={text} buttonClickHand={buttonClickHand} />);

		await userEvent.click(getByRole('button'));

		expect(buttonClickHand).toHaveBeenCalled();
	});

	it('should show the pending spinner when isPending is true', () => {
		const text = chance.word();

		const { container, queryByText } = render(<Button text={text} buttonClickHand={jest.fn()} isPending={true} />);

		expect(queryByText(text)).not.toBeInTheDocument();
		expect(container.querySelector('.spinner')).toBeInTheDocument();
	});
});
