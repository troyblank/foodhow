import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './modal'

describe('Modal', () => {
	it('calls onCancel when overlay (backdrop) is clicked', async () => {
		const user = userEvent.setup()
		const onCancel = jest.fn()
		const message = 'Close me?'

		const { getByRole } = render(
			<Modal
				message={message}
				isShowing={true}
				onConfirm={jest.fn()}
				onCancel={onCancel}
			/>,
		)

		await user.click(getByRole('button', { name: 'Close modal' }))

		expect(onCancel).toHaveBeenCalledTimes(1)
	})

	it('does not call onCancel when clicking inside the modal content', async () => {
		const user = userEvent.setup()
		const onCancel = jest.fn()
		const message = 'Are you sure?'

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
})
