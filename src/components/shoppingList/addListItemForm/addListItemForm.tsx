import React, { useMemo, useState } from 'react'
import { SHOPPING_ITEM_TYPE, SHOPPING_ITEM_STORE, type ShoppingItemType } from '../../../types/data/shoppingList'
import { useAuth } from '../../../contexts'
import { useCreateShoppingListItem, useShoppingListLegend } from '../../../data'
import { getErrorMessage } from '../../../utils/apiCommunication'
import { Modal, Input, Select } from '../..'
import styles from './addListItemForm.module.css'

type AddListItemFormProps = {
    isShowing: boolean
    onClose: () => void
}

const shoppingItemTypeOptions = [
	{ value: '', label: 'Select a type...' },
	...Object.values(SHOPPING_ITEM_TYPE).map((type) => ({
		value: type,
		label: type,
	})),
]

export const AddListItemForm = ({ isShowing, onClose }: AddListItemFormProps) => {
	const { user } = useAuth()
	const { data: legend = [], isError: isLegendError } = useShoppingListLegend(user)
	const { mutateAsync: createItem, isPending } = useCreateShoppingListItem(user)
	const [name, setName] = useState('')
	const [selectedPurposeId, setSelectedPurposeId] = useState('')
	const [selectedType, setSelectedType] = useState<ShoppingItemType | ''>('')

	// Purposes come from the legend so every item on the list uses an emoji the legend explains.
	// Picking one is optional so a new user can add items before the legend has anything in it.
	const purposeOptions = useMemo(() => {
		const getPlaceholderLabel = () => {
			if (isLegendError) return 'Couldn\'t load the legend (optional)'
			if (0 === legend.length) return 'No purposes in the legend yet (optional)'
			return 'No purpose (optional)'
		}

		return [
			{ value: '', label: getPlaceholderLabel() },
			...legend.map((item) => ({
				value: String(item.id),
				label: `${item.emoji} ${item.name}`,
			})),
		]
	}, [legend, isLegendError])

	const selectedPurpose = legend.find((item) => String(item.id) === selectedPurposeId)

	const resetForm = () => {
		setName('')
		setSelectedPurposeId('')
		setSelectedType('')
	}

	const onConfirm = async () => {
		try {
			await createItem({
				name: name.trim(),
				amount: 1,
				store: SHOPPING_ITEM_STORE.unspecified,
				type: selectedType as ShoppingItemType,
				...(selectedPurpose ? { purpose: selectedPurpose.emoji } : {}),
			})
			onClose()
			resetForm()
		} catch (error) {
			alert(getErrorMessage(error))
		}
	}

	const onCancel = () => {
		onClose()
		resetForm()
	}

	const isNameEmpty = 0 === name.trim().length
	const isTypeEmpty = '' === selectedType
	const isFormInvalid = isNameEmpty || isTypeEmpty

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		if (!isFormInvalid && !isPending) {
			onConfirm()
		}
	}

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
				/>
				<label htmlFor={'add-item-type'} className={styles.label}>
					Type
				</label>
				<Select
					id={'add-item-type'}
					value={selectedType}
					onChange={(selectedTypeValue) => setSelectedType(selectedTypeValue as ShoppingItemType | '')}
					options={shoppingItemTypeOptions}
				/>
				<label htmlFor={'add-item-purpose'} className={styles.label}>
					Purpose
				</label>
				<Select
					id={'add-item-purpose'}
					value={selectedPurposeId}
					onChange={setSelectedPurposeId}
					options={purposeOptions}
				/>
			</form>
		</Modal>
	)
}
