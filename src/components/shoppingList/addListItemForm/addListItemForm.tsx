import React, { useState } from 'react';
import { useAuth } from '../../../contexts';
import { useCreateShoppingListItem } from '../../../data';
import { Modal, Input } from '../..';
import styles from './addListItemForm.module.css';

type AddListItemFormProps = {
    isShowing: boolean;
    onClose: () => void;
};

export const AddListItemForm = ({ isShowing, onClose }: AddListItemFormProps) => {
	const { user } = useAuth();
	const { mutateAsync: createItem, isPending } = useCreateShoppingListItem(user);
	const [name, setName] = useState('');

	const resetForm = () => {
		setName('');
	};

	const onConfirm = async () => {
		await createItem({
			name: name.trim(),
			amount: 1,
			store: 'Unspecified',
			type: 'uncommon'
		});
		onClose();
		resetForm();
	};

	const onCancel = () => {
		onClose();
		resetForm();
	};

	const isNameEmpty = 0 === name.trim().length;

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!isNameEmpty && !isPending) {
			onConfirm();
		}
	};

	return (
		<Modal
			message={'Add a new item'}
			isShowing={isShowing}
			onConfirm={onConfirm}
			onCancel={onCancel}
			isConfirmDisabled={isNameEmpty}
			isPending={isPending}
		>
			<form className={styles.form} onSubmit={onSubmit}>
				<label htmlFor={'add-item-name'} className={styles.label}>
					Name
				</label>
				<Input
					id={'add-item-name'}
					name={'name'}
					value={name}
					onChange={setName}
					autoFocus={true}
				/>
			</form>
		</Modal>
	);
};
