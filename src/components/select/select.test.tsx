import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { Select } from './select';

describe('Select', () => {
	const chance = new Chance();

	const mockOptions = () => [
		{ value: chance.word(), label: chance.sentence({ words: 2 }) },
		{ value: chance.word(), label: chance.sentence({ words: 2 }) },
		{ value: chance.word(), label: chance.sentence({ words: 2 }) }
	];

	it('should render with the given value', () => {
		const options = mockOptions();
		const selectedOption = chance.pickone(options);

		const { getByRole } = render(
			<Select value={selectedOption.value} onChange={jest.fn()} options={options} />
		);

		expect(getByRole('combobox')).toHaveValue(selectedOption.value);
	});

	it('should render all options', () => {
		const options = mockOptions();

		const { getByRole } = render(
			<Select value={options[0].value} onChange={jest.fn()} options={options} />
		);

		const select = getByRole('combobox');
		expect(select.querySelectorAll('option')).toHaveLength(options.length);
	});

	it('should call on change handler when selection changes', async () => {
		const options = mockOptions();
		const onChange = jest.fn();

		const { getByRole } = render(
			<Select value={options[0].value} onChange={onChange} options={options} />
		);

		await userEvent.selectOptions(getByRole('combobox'), options[1].value);

		expect(onChange).toHaveBeenCalledWith(options[1].value);
	});

	it('should render with the given id', () => {
		const options = mockOptions();
		const id = chance.word();

		const { getByRole } = render(
			<Select value={options[0].value} onChange={jest.fn()} options={options} id={id} />
		);

		expect(getByRole('combobox')).toHaveAttribute('id', id);
	});

	it('should render with the given name', () => {
		const options = mockOptions();
		const name = chance.word();

		const { getByRole } = render(
			<Select value={options[0].value} onChange={jest.fn()} options={options} name={name} />
		);

		expect(getByRole('combobox')).toHaveAttribute('name', name);
	});

	it('should render option labels correctly', () => {
		const options = mockOptions();

		const { getByText } = render(
			<Select value={options[0].value} onChange={jest.fn()} options={options} />
		);

		options.forEach((option) => {
			expect(getByText(option.label)).toBeInTheDocument();
		});
	});
});
