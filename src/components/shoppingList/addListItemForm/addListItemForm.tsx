import React, { useState } from 'react';
import { SHOPPING_ITEM_TYPE, SHOPPING_ITEM_STORE, type ShoppingItemType } from '../../../types/data/shoppingList';
import { useAuth } from '../../../contexts';
import { useCreateShoppingListItem } from '../../../data';
import { Modal, Input, Select } from '../..';
import styles from './addListItemForm.module.css';

type AddListItemFormProps = {
    isShowing: boolean;
    onClose: () => void;
};

const shoppingItemTypeOptions = [
	{ value: '', label: 'Select a type...' },
	...Object.values(SHOPPING_ITEM_TYPE).map((type) => ({
		value: type,
		label: type
	}))
];

export const AddListItemForm = ({ isShowing, onClose }: AddListItemFormProps) => {
	const { user } = useAuth();
	const { mutateAsync: createItem, isPending } = useCreateShoppingListItem(user);
	const [name, setName] = useState('');
	const [selectedType, setSelectedType] = useState<ShoppingItemType | ''>('');

	const resetForm = () => {
		setName('');
		setSelectedType('');
	};

	const onConfirm = async () => {
		await createItem({
			name: name.trim(),
			amount: 1,
			store: SHOPPING_ITEM_STORE.unspecified,
			type: selectedType as ShoppingItemType
		});
		onClose();
		resetForm();
	};

	const onCancel = () => {
		onClose();
		resetForm();
	};

	const isNameEmpty = 0 === name.trim().length;
	const isTypeEmpty = '' === selectedType;
	const isFormInvalid = isNameEmpty || isTypeEmpty;

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!isFormInvalid && !isPending) {
			onConfirm();
		}
	};

	return (
		<Modal
			message={'Add a new item'}
			isShowing={isShowing}
			onConfirm={onConfirm}
			onCancel={onCancel}
			isConfirmDisabled={isFormInvalid}
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
				<label htmlFor={'add-item-type'} className={styles.label}>
					Type
				</label>
				<Select
					id={'add-item-type'}
					value={selectedType}
					onChange={(value) => setSelectedType(value as ShoppingItemType | '')}
					options={shoppingItemTypeOptions}
				/>
			</form>
		</Modal>
	);
};
