import React from 'react'
import Chance from 'chance'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './modal'

describe('Modal', () => {
	const chance = new Chance()

	it('The modal calls onCancel when the user clicks the overlay backdrop.', async () => {
		const user = userEvent.setup()
		const onCancel = jest.fn()

		const { getByRole } = render(
			<Modal
				message={chance.sentence()}
				isShowing={true}
				onConfirm={jest.fn()}
				onCancel={onCancel}
			/>,
		)

		await user.click(getByRole('button', { name: 'Close modal' }))

		expect(onCancel).toHaveBeenCalledTimes(1)
	})

	it('The modal does not call onCancel when the user clicks inside the modal content.', async () => {
		const user = userEvent.setup()
		const onCancel = jest.fn()
		const message = chance.sentence()

		const { getByText } = render(
			<Modal
				message={message}
				isShowing={true}
				onConfirm={jest.fn()}
				onCancel={onCancel}
			/>,
		)

		await user.click(getByText(message))

		expect(onCancel).not.toHaveBeenCalled()
	})

	it('The modal calls onCancel when the overlay is focused and the user presses Enter.', async () => {
		const user = userEvent.setup()
		const onCancel = jest.fn()

		const { getByRole } = render(
			<Modal
				message={chance.sentence()}
				isShowing={true}
				onConfirm={jest.fn()}
				onCancel={onCancel}
			/>,
		)

		const overlay = getByRole('button', { name: 'Close modal' })
		overlay.focus()
		await user.keyboard('{Enter}')

		expect(onCancel).toHaveBeenCalledTimes(1)
	})

	it('The modal calls onCancel when the overlay is focused and the user presses Space.', async () => {
		const user = userEvent.setup()
		const onCancel = jest.fn()

		const { getByRole } = render(
			<Modal
				message={chance.sentence()}
				isShowing={true}
				onConfirm={jest.fn()}
				onCancel={onCancel}
			/>,
		)

		const overlay = getByRole('button', { name: 'Close modal' })
		overlay.focus()
		await user.keyboard(' ')

		expect(onCancel).toHaveBeenCalledTimes(1)
	})

	it('The modal does not call onCancel when the overlay is focused and the user presses a different key.', async () => {
		const user = userEvent.setup()
		const onCancel = jest.fn()
		const otherKey = chance.character({ pool: 'abcdefghijklmnopqrstuvwxyz0123456789' })

		const { getByRole } = render(
			<Modal
				message={chance.sentence()}
				isShowing={true}
				onConfirm={jest.fn()}
				onCancel={onCancel}
			/>,
		)

		const overlay = getByRole('button', { name: 'Close modal' })
		overlay.focus()
		await user.keyboard(otherKey)

		expect(onCancel).not.toHaveBeenCalled()
	})
})
