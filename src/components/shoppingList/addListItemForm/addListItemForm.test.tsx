import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chance from 'chance'
import { AddListItemForm } from './addListItemForm'
import { TestWrapper, mockUser, mockShoppingListLegendItem } from '../../../testing'
import { useAuth } from '../../../contexts'
import { useCreateShoppingListItem, useShoppingListLegend } from '../../../data'
import { SHOPPING_ITEM_TYPE, SHOPPING_ITEM_STORE, type ShoppingItemType } from '../../../types'

jest.mock('../../../contexts', () => ({
	useAuth: jest.fn(),
}))

jest.mock('../../../data', () => ({
	useCreateShoppingListItem: jest.fn(),
	useShoppingListLegend: jest.fn(),
}))

describe('Add list item form.', () => {
	const chance = new Chance()
	const mockMutateAsync = jest.fn()
	const legendItem = mockShoppingListLegendItem({ id: 1, emoji: '🐑', name: 'Lamb' })

	const fillValidForm = async (
		getByLabelText: (label: string) => HTMLElement,
		itemName = 'Milk',
		type: ShoppingItemType = SHOPPING_ITEM_TYPE.perishable,
	) => {
		await userEvent.type(getByLabelText('Name'), itemName)
		await userEvent.selectOptions(getByLabelText('Type'), type)
		await userEvent.selectOptions(getByLabelText('Purpose'), String(legendItem.id))
	}

	beforeEach(() => {
		jest.clearAllMocks()
		mockMutateAsync.mockResolvedValue({})

		jest.mocked(useAuth).mockReturnValue({
			user: mockUser(),
			attemptToSignIn: jest.fn(),
		})

		jest.mocked(useShoppingListLegend).mockReturnValue({
			data: [legendItem],
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

	it('Offers only the legend emojis as purpose choices.', () => {
		const laterItem = mockShoppingListLegendItem({ id: 3, emoji: '💀', name: 'Bones' })
		const earlierItem = mockShoppingListLegendItem({ id: 2, emoji: '🥦', name: 'Veg' })

		jest.mocked(useShoppingListLegend).mockReturnValue({
			data: [laterItem, earlierItem],
		} as any)

		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		const purposeSelect = getByLabelText('Purpose')
		const optionLabels = Array.from(purposeSelect.querySelectorAll('option')).map((option) => option.textContent)

		expect(optionLabels).toEqual([
			'Select a purpose...',
			`${earlierItem.emoji} ${earlierItem.name}`,
			`${laterItem.emoji} ${laterItem.name}`,
		])
	})

	it('Treats a legend that has not loaded yet as having no purpose choices.', () => {
		jest.mocked(useShoppingListLegend).mockReturnValue({} as any)

		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		const optionLabels = Array.from(getByLabelText('Purpose').querySelectorAll('option')).map((option) => option.textContent)

		expect(optionLabels).toEqual(['No purposes in the legend yet'])
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

	it('Keeps the confirm button disabled when only the purpose is selected.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.selectOptions(getByLabelText('Purpose'), String(legendItem.id))

		expect(getByText('Confirm')).toBeDisabled()
	})

	it('Keeps the confirm button disabled when the name and type are filled but no purpose is selected.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.type(getByLabelText('Name'), 'Milk')
		await userEvent.selectOptions(getByLabelText('Type'), SHOPPING_ITEM_TYPE.perishable)

		expect(getByText('Confirm')).toBeDisabled()
	})

	it('Enables the confirm button when the name, type, and purpose are filled.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await fillValidForm(getByLabelText)

		expect(getByText('Confirm')).not.toBeDisabled()
	})

	it('Sends the new item with the chosen legend emoji as its purpose.', async () => {
		const itemName = chance.word()
		const selectedType = SHOPPING_ITEM_TYPE.produce

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await fillValidForm(getByLabelText, `  ${itemName}  `, selectedType)
		await userEvent.click(getByText('Confirm'))

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledWith({
				name: itemName,
				amount: 1,
				store: SHOPPING_ITEM_STORE.unspecified,
				type: selectedType,
				purpose: legendItem.emoji,
			})
		})
	})

	it('Closes the modal form after a successful submit.', async () => {
		const onClose = jest.fn()

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper },
		)

		await fillValidForm(getByLabelText)
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
		const { getByLabelText, getByText, rerender } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await userEvent.selectOptions(getByLabelText('Purpose'), String(legendItem.id))
		await userEvent.click(getByText('Cancel'))

		rerender(<AddListItemForm isShowing={true} onClose={jest.fn()} />)

		expect(getByLabelText('Purpose')).toHaveValue('')
	})

	it('Keeps the confirm button disabled when the name is only whitespace.', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await fillValidForm(getByLabelText, '   ')

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

		await fillValidForm(getByLabelText)
		fireEvent.submit(container.querySelector('form') as HTMLFormElement)

		expect(mockMutateAsync).not.toHaveBeenCalled()
	})

	it('Submits through the form element when the form receives a submit event and the fields are valid.', async () => {
		const itemName = chance.word()
		const selectedType = SHOPPING_ITEM_TYPE.frozen

		const { getByLabelText, container } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await fillValidForm(getByLabelText, itemName, selectedType)
		fireEvent.submit(container.querySelector('form') as HTMLFormElement)

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledWith({
				name: itemName,
				amount: 1,
				store: SHOPPING_ITEM_STORE.unspecified,
				type: selectedType,
				purpose: legendItem.emoji,
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

	it('Has the placeholder options selected by default.', () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		expect(getByLabelText('Type')).toHaveValue('')
		expect(getByLabelText('Purpose')).toHaveValue('')
	})

	it('Shows an error message when adding an item fails.', async () => {
		const errorMessage = chance.sentence()
		mockMutateAsync.mockRejectedValue(new Error(errorMessage))

		const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper },
		)

		await fillValidForm(getByLabelText)
		await userEvent.click(getByText('Confirm'))

		await waitFor(() => {
			expect(alertSpy).toHaveBeenCalledWith(errorMessage)
		})

		alertSpy.mockRestore()
	})
})
