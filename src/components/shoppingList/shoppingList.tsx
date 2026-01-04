import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts';
import { useShoppingList, useDeleteShoppingListItems } from '../../data';
import { Button, FloatingButton, Modal, HeaderMessage, Spinner } from '..';
import { ShoppingListItem } from './shoppingListItem';
import { UncheckedItems } from './uncheckedItems';
import { AddListItemForm } from './addListItemForm';
import styles from './shoppingList.module.css';

const STORAGE_KEY = 'shoppingListCheckedShoppingListItems';

/* istanbul ignore next */
export const throwLocalStorageError = (): never => {
	throw new Error('Error saving checked items to localStorage');
};

export const ShoppingList = () => {
	const { user } = useAuth();
	const { isLoading, data: shoppingList } = useShoppingList(user);
	const { mutate: deleteShoppingListItems, isPending: isDeletingCheckedItems } = useDeleteShoppingListItems(user);
	const [checkedItemIds, setCheckedItemIds] = useState<Set<number>>(new Set());
	const [isShowingConfirmModal, setIsShowingConfirmModal] = useState(false);
	const [isShowingAddItemModal, setIsShowingAddItemModal] = useState(false);
	const isInitialized = useRef(false);


	// Loads checked items from localStorage once shopping list data is available
	useEffect(() => {
		if (isLoading || !shoppingList) {
			return;
		}

		try {
			const stored = localStorage.getItem(STORAGE_KEY);

			if (stored) {
				const parsedIds = JSON.parse(stored) as number[];
				const validItemIds = new Set(shoppingList.map((item) => item.id));
				const validCheckedIds = parsedIds.filter((id: number) => validItemIds.has(id));

				setCheckedItemIds(new Set(validCheckedIds));
			}
		} catch {
			// Use default of no checked items
		}

		isInitialized.current = true;
	}, [shoppingList, isLoading]);

	// Save checked items to localStorage whenever they change
	useEffect(() => {
		if (!isInitialized.current) {
			// Local store is not initialized yet.
			return;
		}

		try {
			const itemIds = Array.from(checkedItemIds);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(itemIds));
		} catch {
			throwLocalStorageError();
		}
	}, [checkedItemIds]);

	const toggleItemChecked = (id: number) => {
		setCheckedItemIds((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	const onDeleteCheckedItems = () => {
		setIsShowingConfirmModal(false);
		deleteShoppingListItems(Array.from(checkedItemIds));
	};

	const { uncheckedItems, checkedItems } = useMemo(() => {
		if (!shoppingList) {
			return { uncheckedItems: [], checkedItems: [] };
		}
		const unchecked: typeof shoppingList = [];
		const checked: typeof shoppingList = [];

		shoppingList.forEach((item) => {
			if (checkedItemIds.has(item.id)) {
				checked.push(item);
			} else {
				unchecked.push(item);
			}
		});

		return { uncheckedItems: unchecked, checkedItems: checked };
	}, [shoppingList, checkedItemIds]);

	if (isLoading) {
		return (
			<div className={styles['shopping-list__loading']}>
				<Spinner size={'large'} color={'brown'} />
			</div>
		);
	}

	const isEmpty = 0 === shoppingList.length;
	const isAnyItemsChecked = checkedItemIds.size > 0;

	return (
		<section className={styles['shopping-list']}>
			{isEmpty && (
				<div className={styles['shopping-list__no-result-message']}>
					<HeaderMessage headline={'Nothing to shop for'} message={'Add items using the button below, or clicking on ingredients from a recipe.'} />
				</div>
			)}
			<UncheckedItems items={uncheckedItems} onToggle={toggleItemChecked} />
			{ isAnyItemsChecked && (
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
	);
};
