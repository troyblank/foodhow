import React, { useState, useMemo, useEffect } from 'react'
import { useAuth } from '../../contexts'
import { useShoppingList, useDeleteShoppingListItems } from '../../data'
import { getErrorMessage } from '../../utils/apiCommunication'
import { Button, FloatingButton, Modal, HeaderMessage, Spinner } from '..'
import { ShoppingListItem } from './shoppingListItem'
import { UncheckedItems } from './uncheckedItems'
import { AddListItemForm } from './addListItemForm'
import styles from './shoppingList.module.css'

const STORAGE_KEY = 'shoppingListCheckedShoppingListItems'

/* istanbul ignore next */
export const throwLocalStorageError = (): never => {
	throw new Error('Error saving checked items to localStorage')
}

export const ShoppingList = () => {
	const { user } = useAuth()
	const { isLoading, data: shoppingList } = useShoppingList(user)
	const { mutate: deleteShoppingListItems, isPending: isDeletingCheckedItems } = useDeleteShoppingListItems(user)
	const [checkedItemIds, setCheckedItemIds] = useState<Set<number>>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY)
			if (stored) {
				return new Set(JSON.parse(stored) as number[])
			}
		} catch {
			// Use default of no checked items
		}
		return new Set()
	})
	const [isShowingConfirmModal, setIsShowingConfirmModal] = useState(false)
	const [isShowingAddItemModal, setIsShowingAddItemModal] = useState(false)

	// Save checked items to localStorage whenever they change (only persist IDs that exist in current list)
	useEffect(() => {
		if (!shoppingList) return

		try {
			const validItemIds = new Set(shoppingList.map((item) => item.id))
			const itemIds = Array.from(checkedItemIds).filter((id) => validItemIds.has(id))
			localStorage.setItem(STORAGE_KEY, JSON.stringify(itemIds))
		} catch {
			throwLocalStorageError()
		}
	}, [checkedItemIds, shoppingList])

	const toggleItemChecked = (id: number) => {
		setCheckedItemIds((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(id)) {
				newSet.delete(id)
			} else {
				newSet.add(id)
			}
			return newSet
		})
	}

	const onDeleteCheckedItems = () => {
		setIsShowingConfirmModal(false)
		deleteShoppingListItems(Array.from(checkedItemIds), {
			onError: (error) => alert(getErrorMessage(error)),
		})
	}

	const { uncheckedItems, checkedItems } = useMemo(() => {
		if (!shoppingList) {
			return { uncheckedItems: [], checkedItems: [] }
		}
		const unchecked: typeof shoppingList = []
		const checked: typeof shoppingList = []

		shoppingList.forEach((item) => {
			if (checkedItemIds.has(item.id)) {
				checked.push(item)
			} else {
				unchecked.push(item)
			}
		})

		return { uncheckedItems: unchecked, checkedItems: checked }
	}, [shoppingList, checkedItemIds])

	if (isLoading) {
		return (
			<div className={styles['shopping-list__loading']}>
				<Spinner size={'large'} color={'brown'} />
			</div>
		)
	}

	const isEmpty = 0 === shoppingList.length
	const hasCheckedItemsInList = checkedItems.length > 0

	return (
		<section className={styles['shopping-list']}>
			{isEmpty && (
				<div className={styles['shopping-list__no-result-message']}>
					<HeaderMessage headline={'Nothing to shop for'} message={'Add items using the button below, or clicking on ingredients from a recipe.'} />
				</div>
			)}
			<UncheckedItems items={uncheckedItems} onToggle={toggleItemChecked} />
			{ hasCheckedItemsInList && (
				<div className={styles['shopping-list__clear-button']}>
					<Button
						text={'Delete Checked'}
						buttonClickHand={() => setIsShowingConfirmModal(true)}
						isPending={isDeletingCheckedItems}
					/>
				</div>
			)}
			{checkedItems.length > 0 && (
				<ul className={styles['shopping-list__items']}>
					{checkedItems.map((item) => (
						<ShoppingListItem
							key={item.id}
							item={item}
							checked={checkedItemIds.has(item.id)}
							onToggle={toggleItemChecked}
						/>
					))}
				</ul>
			)}
			<Modal
				message={'Are you sure you want to delete the checked items?'}
				isShowing={isShowingConfirmModal}
				onConfirm={() => onDeleteCheckedItems()}
				onCancel={() => setIsShowingConfirmModal(false)}
			/>
			<FloatingButton ariaLabel={'Add item'} onClick={() => setIsShowingAddItemModal(true)} />
			<AddListItemForm
				isShowing={isShowingAddItemModal}
				onClose={() => setIsShowingAddItemModal(false)}
			/>
		</section>
	)
}
