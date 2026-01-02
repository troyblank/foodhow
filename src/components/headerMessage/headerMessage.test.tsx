import React from 'react';
import { render } from '@testing-library/react';
import Chance from 'chance';
import { HeaderMessage } from './headerMessage';

describe('HeaderMessage', () => {
	const chance = new Chance();

	it('should render headline and message', () => {
		const headline = chance.sentence();
		const message = chance.sentence();

		const { getByText } = render(<HeaderMessage headline={headline} message={message} />);

		expect(getByText(headline)).toBeInTheDocument();
		expect(getByText(message)).toBeInTheDocument();
	});

	it('should return null when both headline and message are empty', () => {
		const { container } = render(<HeaderMessage headline={''} message={''} />);

		expect(container.firstChild).toBeNull();
	});

	it('should render when only headline is provided', () => {
		const headline = chance.sentence();

		const { getByText } = render(<HeaderMessage headline={headline} message={''} />);

		expect(getByText(headline)).toBeInTheDocument();
	});

	it('should render when only message is provided', () => {
		const message = chance.sentence();

		const { getByText } = render(<HeaderMessage headline={''} message={message} />);

		expect(getByText(message)).toBeInTheDocument();
	});
});
