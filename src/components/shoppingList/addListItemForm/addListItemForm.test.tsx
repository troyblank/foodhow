import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { AddListItemForm } from './addListItemForm';
import { TestWrapper, mockUser } from '../../../testing';
import { useAuth } from '../../../contexts';
import { useCreateShoppingListItem } from '../../../data';

jest.mock('../../../contexts', () => ({
	useAuth: jest.fn()
}));

jest.mock('../../../data', () => ({
	useCreateShoppingListItem: jest.fn()
}));

describe('AddListItemForm', () => {
	const chance = new Chance();
	const mockMutateAsync = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockMutateAsync.mockResolvedValue({});

		jest.mocked(useAuth).mockReturnValue({
			user: mockUser(),
			attemptToSignIn: jest.fn()
		});

		jest.mocked(useCreateShoppingListItem).mockReturnValue({
			mutateAsync: mockMutateAsync,
			isPending: false
		} as any);
	});

	it('should not render when set to not show', () => {
		const { queryByRole } = render(
			<AddListItemForm isShowing={false} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		expect(queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('should render when set to show', () => {
		const { getByRole } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		expect(getByRole('dialog')).toBeInTheDocument();
	});

	it('should render name input', () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		expect(getByLabelText('Name')).toBeInTheDocument();
	});

	it('should have confirm button disabled when name is empty', () => {
		const { getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		expect(getByText('Confirm')).toBeDisabled();
	});

	it('should enable confirm button when name has value', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.type(getByLabelText('Name'), 'Milk');

		expect(getByText('Confirm')).not.toBeDisabled();
	});

	it('should call createItem with on confirm', async () => {
		const itemName = chance.word();
		const onClose = jest.fn();

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.type(getByLabelText('Name'), `  ${itemName}  `);
		await userEvent.click(getByText('Confirm'));

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledWith({
				name: itemName,
				amount: 1,
				store: 'Unspecified',
				type: 'uncommon'
			});
		});
	});

	it('should close the modal form after successful submit', async () => {
		const onClose = jest.fn();

		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.type(getByLabelText('Name'), 'Milk');
		await userEvent.click(getByText('Confirm'));

		await waitFor(() => {
			expect(onClose).toHaveBeenCalled();
		});
	});

	it('should close the modal form when cancel is clicked', async () => {
		const onClose = jest.fn();

		const { getByText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.click(getByText('Cancel'));

		expect(onClose).toHaveBeenCalled();
	});

	it('should reset form after cancel', async () => {
		const { getByLabelText, getByText, rerender } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.type(getByLabelText('Name'), 'Milk');
		await userEvent.click(getByText('Cancel'));

		rerender(<AddListItemForm isShowing={true} onClose={jest.fn()} />);

		expect(getByLabelText('Name')).toHaveValue('');
	});

	it('should keep confirm disabled when name is only whitespace', async () => {
		const { getByLabelText, getByText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.type(getByLabelText('Name'), '   ');

		expect(getByText('Confirm')).toBeDisabled();
	});

	it('should submit form when Enter is pressed', async () => {
		const itemName = chance.word();
		const onClose = jest.fn();

		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={onClose} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.type(getByLabelText('Name'), `${itemName}{Enter}`);

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledWith({
				name: itemName,
				amount: 1,
				store: 'Unspecified',
				type: 'uncommon'
			});
		});
	});

	it('should not submit form when Enter is pressed and name is empty', async () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		await userEvent.type(getByLabelText('Name'), '{Enter}');

		expect(mockMutateAsync).not.toHaveBeenCalled();
	});

	it('should auto-focus the name input when modal is shown', () => {
		const { getByLabelText } = render(
			<AddListItemForm isShowing={true} onClose={jest.fn()} />,
			{ wrapper: TestWrapper }
		);

		expect(getByLabelText('Name')).toHaveFocus();
	});
});
