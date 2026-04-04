import React, { useMemo, useState } from 'react'
import { SHOPPING_ITEM_TYPE, SHOPPING_ITEM_STORE, type ShoppingItemType } from '../../../types/data/shoppingList'
import { useAuth } from '../../../contexts'
import { useCreateShoppingListItem, useShoppingList } from '../../../data'
import { getErrorMessage } from '../../../utils/apiCommunication'
import { AutoComplete, Modal, Input, Select } from '../..'
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

export const DEFAULT_PURPOSE_SUGGESTIONS = ['Bunnies', 'Lurita'] as const

export const AddListItemForm = ({ isShowing, onClose }: AddListItemFormProps) => {
	const { user } = useAuth()
	const { data: shoppingList = [] } = useShoppingList(user)
	const { mutateAsync: createItem, isPending } = useCreateShoppingListItem(user)
	const [name, setName] = useState('')
	const [purpose, setPurpose] = useState('')
	const [selectedType, setSelectedType] = useState<ShoppingItemType | ''>('')

	const purposeSuggestions = useMemo(() => {
		const seen = new Set<string>(DEFAULT_PURPOSE_SUGGESTIONS)
		for (const item of shoppingList) {
			const purposeFromItem = item.purpose?.trim()
			if (purposeFromItem) {
				seen.add(purposeFromItem)
			}
		}
		return Array.from(seen).sort((itemA, itemB) => itemA.localeCompare(itemB))
	}, [shoppingList])

	const resetForm = () => {
		setName('')
		setPurpose('')
		setSelectedType('')
	}

	const onConfirm = async () => {
		try {
			const trimmedPurpose = purpose.trim()
			await createItem({
				name: name.trim(),
				amount: 1,
				store: SHOPPING_ITEM_STORE.unspecified,
				type: selectedType as ShoppingItemType,
				...(trimmedPurpose ? { purpose: trimmedPurpose } : {}),
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
				<AutoComplete
					id={'add-item-purpose'}
					name={'purpose'}
					value={purpose}
					onChange={setPurpose}
					options={purposeSuggestions}
				/>
			</form>
		</Modal>
	)
}
