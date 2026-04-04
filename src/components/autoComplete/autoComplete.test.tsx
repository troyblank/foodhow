import React from 'react'
import { render, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chance from 'chance'
import { AutoComplete } from './autoComplete'

describe('AutoComplete', () => {
	const chance = new Chance()

	it('Renders with the given value.', () => {
		const value = chance.word()
		const fieldId = chance.word()

		const { getByRole } = render(
			<AutoComplete
				id={fieldId}
				value={value}
				onChange={jest.fn()}
				options={[]}
			/>,
		)

		expect(getByRole('combobox')).toHaveValue(value)
	})

	it('Calls onChange with the new value when typing.', async () => {
		const onChange = jest.fn()
		const fieldId = chance.word()
		const typed = chance.character()

		const { getByRole } = render(
			<AutoComplete
				id={fieldId}
				value={''}
				onChange={onChange}
				options={[]}
			/>,
		)

		await userEvent.type(getByRole('combobox'), typed)

		expect(onChange).toHaveBeenLastCalledWith(typed)
	})

	it('Renders the input with the given id.', () => {
		const id = chance.word()

		const { getByRole } = render(
			<AutoComplete
				id={id}
				value={''}
				onChange={jest.fn()}
				options={[]}
			/>,
		)

		expect(getByRole('combobox')).toHaveAttribute('id', id)
	})

	it('Renders the input with the given name when provided.', () => {
		const fieldId = chance.word()
		const name = chance.word()

		const { getByRole } = render(
			<AutoComplete
				id={fieldId}
				name={name}
				value={''}
				onChange={jest.fn()}
				options={[]}
			/>,
		)

		expect(getByRole('combobox')).toHaveAttribute('name', name)
	})

	it('Shows options when the field is opened.', async () => {
		const fieldId = chance.word()
		const firstOption = chance.word()
		let secondOption = chance.word()
		while (secondOption === firstOption) {
			secondOption = chance.word()
		}
		const options = [firstOption, secondOption]

		const { getByRole } = render(
			<AutoComplete
				id={fieldId}
				value={''}
				onChange={jest.fn()}
				options={options}
			/>,
		)

		await userEvent.click(getByRole('combobox'))

		await waitFor(() => {
			expect(getByRole('listbox')).toBeInTheDocument()
		})

		const optionLabels = within(getByRole('listbox'))
			.getAllByRole('option')
			.map((option) => option.textContent)
		expect(optionLabels).toEqual(options)
	})
})
