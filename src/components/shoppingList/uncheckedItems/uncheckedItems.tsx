import React, { useMemo, type FunctionComponent } from 'react';
import type { ShoppingListItem as ShoppingListItemType, ShoppingItemType } from '../../../types';
import { SHOPPING_ITEM_TYPE } from '../../../types';
import { ShoppingListItem } from '../shoppingListItem';
import styles from './uncheckedItems.module.css';

type UncheckedItemsProps = {
	items: ShoppingListItemType[];
	onToggle: (id: number) => void;
};

const TYPE_ORDER: ShoppingItemType[] = [
	SHOPPING_ITEM_TYPE.uncommon,
	SHOPPING_ITEM_TYPE.spice,
	SHOPPING_ITEM_TYPE.produce,
	SHOPPING_ITEM_TYPE.imperishable,
	SHOPPING_ITEM_TYPE.meat,
	SHOPPING_ITEM_TYPE.perishable,
	SHOPPING_ITEM_TYPE.frozen
];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const UncheckedItems: FunctionComponent<UncheckedItemsProps> = ({ items, onToggle }) => {
	const groupedItems = useMemo(() => {
		const groups = new Map<ShoppingItemType, ShoppingListItemType[]>();

		items.forEach((item) => {
			const existing = groups.get(item.type) || [];
			groups.set(item.type, [...existing, item]);
		});

		return groups;
	}, [items]);

	return (
		<div className={styles['unchecked-items']}>
			{TYPE_ORDER.map((type) => {
				const typeItems = groupedItems.get(type);
				if (!typeItems || 0 === typeItems.length) {
					return null;
				}

				return (
					<section key={type} className={styles.category}>
						<h2 className={styles.categoryHeading}>{capitalize(type)}</h2>
						<ul className={styles.categoryList}>
							{typeItems.map((item) => (
								<ShoppingListItem
									key={item.id}
									item={item}
									checked={false}
									onToggle={onToggle}
								/>
							))}
						</ul>
					</section>
				);
			})}
		</div>
	);
};
