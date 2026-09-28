import React from 'react'
import { fireEvent, render, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chance from 'chance'
import { Legend } from './legend'
import { TestWrapper, mockUser, mockShoppingListLegendItem } from '../../../testing'
import { useAuth } from '../../../contexts'
import { useDeleteShoppingListLegendItem, useSaveShoppingListLegendItem, useShoppingListLegend } from '../../../data'

jest.mock('../../../contexts', () => ({
	useAuth: jest.fn(),
}))

jest.mock('../../../data', () => ({
	useDeleteShoppingListLegendItem: jest.fn(),
	useSaveShoppingListLegendItem: jest.fn(),
	useShoppingListLegend: jest.fn(),
}))

describe('Shopping list legend.', () => {
	const chance = new Chance()
	const mockSaveMutateAsync = jest.fn()
	const mockDeleteMutate = jest.fn()

	const renderLegend = () => render(<Legend />, { wrapper: TestWrapper })

	beforeEach(() => {
		mockSaveMutateAsync.mockResolvedValue(mockShoppingListLegendItem())

		jest.mocked(useAuth).mockReturnValue({
			user: mockUser(),
			attemptToSignIn: jest.fn(),
		})

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [],
		} as any)

		jest.mocked(useSaveShoppingListLegendItem).mockReturnValue({
			mutateAsync: mockSaveMutateAsync,
			isPending: false,
		} as any)

		jest.mocked(useDeleteShoppingListLegendItem).mockReturnValue({
			mutate: mockDeleteMutate,
			isPending: false,
		} as any)
	})

	it('Shows a legend heading.', () => {
		const { getByRole } = renderLegend()

		expect(getByRole('heading', { name: 'Legend' })).toBeInTheDocument()
	})

	it('Shows a loading indicator while the legend is being fetched.', () => {
		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: true,
			data: undefined,
		} as any)

		const { getByLabelText, queryByRole } = renderLegend()

		expect(getByLabelText('Loading')).toBeInTheDocument()
		expect(queryByRole('list')).not.toBeInTheDocument()
	})

	it('Shows a message when the legend is empty.', () => {
		const { getByText } = renderLegend()

		expect(getByText('No legend items yet.')).toBeInTheDocument()
	})

	it('Treats a legend that has not loaded yet as empty.', () => {
		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: undefined,
		} as any)

		const { getByText } = renderLegend()

		expect(getByText('No legend items yet.')).toBeInTheDocument()
	})

	it('Tells the user when the legend could not be loaded instead of calling it empty.', () => {
		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			isError: true,
			data: undefined,
			refetch: jest.fn(),
		} as any)

		const { getByRole, queryByText } = renderLegend()

		expect(getByRole('alert')).toHaveTextContent('Couldn\'t load the legend.')
		expect(queryByText('No legend items yet.')).not.toBeInTheDocument()
	})

	it('Lets the user retry loading the legend after it fails.', async () => {
		const mockRefetch = jest.fn()

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			isError: true,
			data: undefined,
			refetch: mockRefetch,
		} as any)

		const { getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Try again' }))

		expect(mockRefetch).toHaveBeenCalled()
	})

	it('Shows each legend item with its emoji and name.', () => {
		const legendItem = mockShoppingListLegendItem()

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [legendItem],
		} as any)

		const { getByRole, queryByText } = renderLegend()

		const item = within(getByRole('list')).getByRole('listitem')

		expect(item).toHaveTextContent(legendItem.emoji)
		expect(item).toHaveTextContent(legendItem.name)
		expect(queryByText('No legend items yet.')).not.toBeInTheDocument()
	})

	it('Shows legend items in the order the legend provides.', () => {
		const firstCreated = mockShoppingListLegendItem({ id: 1, name: 'first' })
		const secondCreated = mockShoppingListLegendItem({ id: 2, name: 'second' })
		const thirdCreated = mockShoppingListLegendItem({ id: 3, name: 'third' })

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [firstCreated, secondCreated, thirdCreated],
		} as any)

		const { getAllByRole } = renderLegend()

		const names = getAllByRole('listitem').map((item) => item.textContent)

		expect(names[0]).toContain('first')
		expect(names[1]).toContain('second')
		expect(names[2]).toContain('third')
	})

	it('Hides the new item form until the add button is clicked.', () => {
		const { queryByLabelText, getByRole } = renderLegend()

		expect(queryByLabelText('Emoji')).not.toBeInTheDocument()
		expect(getByRole('button', { name: 'Add legend item' })).toBeInTheDocument()
	})

	it('Opens a form for a new legend item from the add button.', async () => {
		const { getByRole, findByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))

		expect(await findByRole('dialog')).toHaveTextContent('Add a legend item')
	})

	it('Keeps confirm disabled when the form is empty.', async () => {
		const { getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Keeps confirm disabled when only the name is filled.', async () => {
		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Name'), 'Lamb')

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Keeps confirm disabled when only the emoji is filled.', async () => {
		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Keeps confirm disabled when the emoji field holds text instead of an emoji.', async () => {
		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), 'ab')
		await userEvent.type(getByLabelText('Name'), 'Lamb')

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Keeps confirm disabled when more than one emoji is entered.', async () => {
		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑💀')
		await userEvent.type(getByLabelText('Name'), 'Lamb')

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Keeps confirm disabled when the name is only whitespace.', async () => {
		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), '   ')

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Keeps confirm disabled when the emoji is already in the legend.', async () => {
		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [mockShoppingListLegendItem({ emoji: '🐑', name: 'Lamb' })],
		} as any)

		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), 'Party')

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Keeps confirm disabled when the emoji matches an existing one aside from surrounding spaces.', async () => {
		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [mockShoppingListLegendItem({ emoji: '🐑', name: 'Lamb' })],
		} as any)

		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), ' 🐑 ')
		await userEvent.type(getByLabelText('Name'), 'Party')

		expect(getByRole('button', { name: 'Confirm' })).toBeDisabled()
	})

	it('Enables confirm when the emoji is not already in the legend.', async () => {
		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [mockShoppingListLegendItem({ emoji: '🐑', name: 'Lamb' })],
		} as any)

		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '💀')
		await userEvent.type(getByLabelText('Name'), 'Party')

		expect(getByRole('button', { name: 'Confirm' })).not.toBeDisabled()
	})

	it('Enables confirm when a single emoji and a name are filled.', async () => {
		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), 'Lamb')

		expect(getByRole('button', { name: 'Confirm' })).not.toBeDisabled()
	})

	it('Saves the trimmed emoji and name when the new item is confirmed.', async () => {
		const name = chance.word()

		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), ' 🐑 ')
		await userEvent.type(getByLabelText('Name'), `  ${name}  `)
		await userEvent.click(getByRole('button', { name: 'Confirm' }))

		await waitFor(() => {
			expect(mockSaveMutateAsync).toHaveBeenCalledWith({ emoji: '🐑', name })
		})
	})

	it('Closes the form and clears it after a successful save.', async () => {
		const { getByLabelText, getByRole, queryByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), 'Lamb')
		await userEvent.click(getByRole('button', { name: 'Confirm' }))

		await waitFor(() => {
			expect(queryByRole('dialog')).not.toBeInTheDocument()
		})

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))

		expect(getByLabelText('Emoji')).toHaveValue('')
		expect(getByLabelText('Name')).toHaveValue('')
	})

	it('Closes the form and clears it when adding is cancelled.', async () => {
		const { getByLabelText, getByRole, queryByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), 'Lamb')
		await userEvent.click(getByRole('button', { name: 'Cancel' }))

		await waitFor(() => {
			expect(queryByRole('dialog')).not.toBeInTheDocument()
		})

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))

		expect(getByLabelText('Emoji')).toHaveValue('')
		expect(getByLabelText('Name')).toHaveValue('')
	})

	it('Saves when the form is submitted with the keyboard and the fields are valid.', async () => {
		const name = chance.word()

		const { getByLabelText, getByRole, container } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), name)
		fireEvent.submit(container.querySelector('form') as HTMLFormElement)

		await waitFor(() => {
			expect(mockSaveMutateAsync).toHaveBeenCalledWith({ emoji: '🐑', name })
		})
	})

	it('Does not save when the form is submitted with the keyboard and the fields are invalid.', async () => {
		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Name'), 'Lamb{Enter}')

		expect(mockSaveMutateAsync).not.toHaveBeenCalled()
	})

	it('Does not save again while a save is already in progress.', async () => {
		jest.mocked(useSaveShoppingListLegendItem).mockReturnValue({
			mutateAsync: mockSaveMutateAsync,
			isPending: true,
		} as any)

		const { getByLabelText, getByRole, container } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), 'Lamb')
		fireEvent.submit(container.querySelector('form') as HTMLFormElement)

		expect(mockSaveMutateAsync).not.toHaveBeenCalled()
	})

	it('Shows an error message when saving fails.', async () => {
		const errorMessage = chance.sentence()
		mockSaveMutateAsync.mockRejectedValue(new Error(errorMessage))
		const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), 'Lamb')
		await userEvent.click(getByRole('button', { name: 'Confirm' }))

		await waitFor(() => {
			expect(alertSpy).toHaveBeenCalledWith(errorMessage)
		})

		alertSpy.mockRestore()
	})

	it('Keeps the entered values when saving fails so they can be tried again.', async () => {
		mockSaveMutateAsync.mockRejectedValue(new Error(chance.sentence()))
		const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

		const { getByLabelText, getByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: 'Add legend item' }))
		await userEvent.type(getByLabelText('Emoji'), '🐑')
		await userEvent.type(getByLabelText('Name'), 'Lamb')
		await userEvent.click(getByRole('button', { name: 'Confirm' }))

		await waitFor(() => {
			expect(alertSpy).toHaveBeenCalled()
		})

		expect(getByLabelText('Emoji')).toHaveValue('🐑')
		expect(getByLabelText('Name')).toHaveValue('Lamb')

		alertSpy.mockRestore()
	})

	it('Asks for confirmation before removing a legend item.', async () => {
		const legendItem = mockShoppingListLegendItem()

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [legendItem],
		} as any)

		const { getByRole, findByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: `Remove ${legendItem.name} from legend` }))

		const dialog = await findByRole('dialog')

		expect(dialog).toHaveTextContent(`Remove ${legendItem.name} from the legend?`)
		expect(mockDeleteMutate).not.toHaveBeenCalled()
	})

	it('Removes the legend item after the removal is confirmed.', async () => {
		const legendItem = mockShoppingListLegendItem()

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [legendItem],
		} as any)

		const { getByRole, findByRole, queryByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: `Remove ${legendItem.name} from legend` }))
		await userEvent.click(await findByRole('button', { name: 'Confirm' }))

		expect(mockDeleteMutate).toHaveBeenCalledWith(legendItem.id, { onError: expect.any(Function) })
		await waitFor(() => {
			expect(queryByRole('dialog')).not.toBeInTheDocument()
		})
	})

	it('Does not remove the legend item when the removal is cancelled.', async () => {
		const legendItem = mockShoppingListLegendItem()

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [legendItem],
		} as any)

		const { getByRole, findByRole, queryByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: `Remove ${legendItem.name} from legend` }))
		await userEvent.click(await findByRole('button', { name: 'Cancel' }))

		await waitFor(() => {
			expect(queryByRole('dialog')).not.toBeInTheDocument()
		})
		expect(mockDeleteMutate).not.toHaveBeenCalled()
	})

	it('Shows an error message when removing a legend item fails.', async () => {
		const legendItem = mockShoppingListLegendItem()
		const errorMessage = chance.sentence()
		const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [legendItem],
		} as any)

		const { getByRole, findByRole } = renderLegend()

		await userEvent.click(getByRole('button', { name: `Remove ${legendItem.name} from legend` }))
		await userEvent.click(await findByRole('button', { name: 'Confirm' }))

		const [, options] = mockDeleteMutate.mock.calls[0]
		options.onError(new Error(errorMessage))

		expect(alertSpy).toHaveBeenCalledWith(errorMessage)

		alertSpy.mockRestore()
	})

	it('Disables the remove buttons while a removal is in progress.', () => {
		const legendItem = mockShoppingListLegendItem()

		jest.mocked(useShoppingListLegend).mockReturnValue({
			isLoading: false,
			data: [legendItem],
		} as any)

		jest.mocked(useDeleteShoppingListLegendItem).mockReturnValue({
			mutate: mockDeleteMutate,
			isPending: true,
		} as any)

		const { getByRole } = renderLegend()

		expect(getByRole('button', { name: `Remove ${legendItem.name} from legend` })).toBeDisabled()
	})
})
