import React from 'react'
import { fireEvent, render, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chance from 'chance'
import { AddListItemForm, DEFAULT_PURPOSE_SUGGESTIONS } from './addListItemForm'
import { TestWrapper, mockUser, mockShoppingListItem } from '../../../testing'
import { useAuth } from '../../../contexts'
import { useCreateShoppingListItem, useShoppingList } from '../../../data'
import { SHOPPING_ITEM_TYPE, SHOPPING_ITEM_STORE } from '../../../types'

jest.mock('../../../contexts', () => ({
	useAuth: jest.fn(),
}))

jest.mock('../../../data', () => ({
	useCreateShoppingListItem: jest.fn(),
	useShoppingList: jest.fn(),
}))

describe('Add list item form.', () => {
	const chance = new Chance()
	const mockMutateAsync = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		mockMutateAsync.mockResolvedValue({})

		jest.mocked(useAuth).mockReturnValue({
			user: mockUser(),
			attemptToSignIn: jest.fn(),
		})

		jest.mocked(useShoppingList).mockReturnValue({
			data: [],
		} as any)

		jest.mocked(useCreateShoppingListItem).mockReturnValue({
			mutateAsync: mockMutateAsync,
			isPending: false,
		} as any)
	})

	it('Does not render when set to not show.', () => {
		const { queryByRole } = render(
			<AddListItemForm isShowing={false} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('Renders when set to show.', () => {
		const { getByRole } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(getByRole('dialog')).toBeInTheDocument()
	})

	it('Renders the name input.', () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(getByLabelText('Name')).toBeInTheDocument()
	})

	it('Renders the type select.', () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(getByLabelText('Type')).toBeInTheDocument()
	})

	it('Treats a missing shopping list query as an empty list for purpose suggestions.', () => {
		jest.mocked(useShoppingList).mockReturnValue({} as any)

		render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(document.querySelectorAll('[role="option"]')).toHaveLength(0)
	})

	it('Shows purpose suggestions from existing list items when the field is opened.', async () => {
		let purposeFromListA = chance.word()
		let purposeFromListB = chance.word()
		while (purposeFromListB === purposeFromListA) {
			purposeFromListB = chance.word()
		}

		jest.mocked(useShoppingList).mockReturnValue({
			data: [
				mockShoppingListItem({ purpose: purposeFromListA }),
				mockShoppingListItem({ purpose: purposeFromListB }),
			],
		} as any)

		const { getByLabelText, getByRole } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.click(getByLabelText('Purpose'))

		await waitFor(() => {
			expect(getByRole('listbox')).toBeInTheDocument()
		})

		const optionLabels = within(getByRole('listbox'))
			.getAllByRole('option')
			.map((option) => option.textContent)
		const expectedLabels = Array.from(
			new Set([...DEFAULT_PURPOSE_SUGGESTIONS, purposeFromListA, purposeFromListB]),
		).sort((labelA, labelB) => labelA.localeCompare(labelB))
		expect(optionLabels).toEqual(expectedLabels)
	})

	it('Has the confirm button disabled when the form is empty.', () => {
		const { getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(getByText('Confirm')).toBeDisabled()
	})

	it('Keeps the confirm button disabled when only the name is filled.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), 'Milk')

		expect(getByText('Confirm')).toBeDisabled()
	})

	it('Keeps the confirm button disabled when only the type is selected.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.produce)

		expect(getByText('Confirm')).toBeDisabled()
	})

	it('Enables the confirm button when the name and type are filled.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), 'Milk')
		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.perishable)

		expect(getByText('Confirm')).not.toBeDisabled()
	})

	it('Sends the new item with the correct name, amount, and type on confirm.', async () => {
		const itemName = chance.word()
		const selectedType = SHOPPING_ITEM_TYPE.produce
		const onClose = jest.fn()

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), `  ${itemName}  `)
		await userEvent.selectOptions(getByLabelText('Type'), selectedType)
		await userEvent.click(getByText('Confirm'))

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledWith({
				name: itemName,
				amount: 1,
				store: SHOPPING_ITEM_STORE.unspecified,
				type: selectedType,
			})
		})
	})

	it('Includes purpose in the new item when the purpose field is filled.', async () => {
		const itemName = chance.word()
		const purposeLabel = chance.word()
		const selectedType = SHOPPING_ITEM_TYPE.produce
		const onClose = jest.fn()

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), itemName)
		await userEvent.type(getByLabelText('Purpose'), purposeLabel)
		await userEvent.selectOptions(getByLabelText('Type'), selectedType)
		await userEvent.click(getByText('Confirm'))

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledWith({
				name: itemName,
				amount: 1,
				store: SHOPPING_ITEM_STORE.unspecified,
				type: selectedType,
				purpose: purposeLabel,
			})
		})
	})

	it('Closes the modal form after a successful submit.', async () => {
		const onClose = jest.fn()

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), 'Milk')
		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.perishable)
		await userEvent.click(getByText('Confirm'))

		await waitFor(() => {
			expect(onClose).toHaveBeenCalled()
		})
	})

	it('Closes the modal form when cancel is clicked.', async () => {
		const onClose = jest.fn()

		const { getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.click(getByText('Cancel'))

		expect(onClose).toHaveBeenCalled()
	})

	it('Resets the name after cancel.', async () => {
		const { getByLabelText, getByText, rerender } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), 'Milk')
		await userEvent.click(getByText('Cancel'))

		rerender(<AddListItemForm isShowing={true} onClose={jest.fn()} />)

		expect(getByLabelText('Name')).toHaveValue('')
	})

	it('Resets the type after cancel.', async () => {
		const { getByLabelText, getByText, rerender } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.meat)
		await userEvent.click(getByText('Cancel'))

		rerender(<AddListItemForm isShowing={true} onClose={jest.fn()} />)

		expect(getByLabelText('Type')).toHaveValue('')
	})

	it('Resets the purpose after cancel.', async () => {
		const purposeBeforeCancel = chance.word()

		const { getByLabelText, getByText, rerender } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Purpose'), purposeBeforeCancel)
		await userEvent.click(getByText('Cancel'))

		rerender(<AddListItemForm isShowing={true} onClose={jest.fn()} />)

		expect(getByLabelText('Purpose')).toHaveValue('')
	})

	it('Keeps the confirm button disabled when the name is only whitespace.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), '   ')
		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.produce)

		expect(getByText('Confirm')).toBeDisabled()
	})

	it('Does not submit through the form while a create request is already in progress.', async () => {
		jest.mocked(useCreateShoppingListItem).mockReturnValue({
			mutateAsync: mockMutateAsync,
			isPending: true,
		} as any)

		const { getByLabelText, container } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.produce)
		await userEvent.type(getByLabelText('Name'), 'Milk')
		fireEvent.submit(container.querySelector('form') as HTMLFormElement)

		expect(mockMutateAsync).not.toHaveBeenCalled()
	})

	it('Submits through the form element when the form receives a submit event and the fields are valid.', async () => {
		const itemName = chance.word()
		const selectedType = SHOPPING_ITEM_TYPE.frozen
		const onClose = jest.fn()

		const { getByLabelText, container } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.selectOptions(getByLabelText('Type'), selectedType)
		await userEvent.type(getByLabelText('Name'), itemName)
		fireEvent.submit(container.querySelector('form') as HTMLFormElement)

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledWith({
				name: itemName,
				amount: 1,
				store: SHOPPING_ITEM_STORE.unspecified,
				type: selectedType,
			})
		})
	})

	it('Does not submit the form when Enter is pressed and the form is invalid.', async () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), '{Enter}')

		expect(mockMutateAsync).not.toHaveBeenCalled()
	})

	it('Has the placeholder option selected by default.', () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(getByLabelText('Type')).toHaveValue('')
	})

	it('Shows an error message when adding an item fails.', async () => {
		const errorMessage = chance.sentence()
		mockMutateAsync.mockRejectedValue(new Error(errorMessage))

		const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), 'Milk')
		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.perishable)
		await userEvent.click(getByText('Confirm'))

		await waitFor(() => {
			expect(alertSpy).toHaveBeenCalledWith(errorMessage)
		})

		alertSpy.mockRestore()
	})
})
