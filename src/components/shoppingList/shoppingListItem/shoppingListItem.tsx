import React from 'react';
import dompurify from 'dompurify';
import { type ShoppingListItem as ShoppingListItemType } from '../../../types';
import styles from './shoppingListItem.module.css';

type ShoppingListItemProps = {
    item: ShoppingListItemType;
    checked: boolean;
    onToggle: (id: number) => void;
};

export const ShoppingListItem = ({ item, checked, onToggle }: ShoppingListItemProps) => {
	const { name, id } = item;

	const handleListItemClick = () => {
		onToggle(id);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		onToggle(id);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onToggle(id);
		}
	};

	return (
		<li
			className={styles['list-item-box']}
			onClick={handleListItemClick}
			role={'button'}
			tabIndex={0}
			aria-label={`${name} - ${checked ? 'checked' : 'unchecked'}`}
			onKeyDown={handleKeyDown}
		>
			<input
				type={'checkbox'}
				checked={checked}
				onChange={handleCheckboxChange}
				onClick={(event) => event.stopPropagation()}
				className={styles['list-item-box__checkbox']}
				tabIndex={-1}
				aria-label={`Mark ${name} as ${checked ? 'unchecked' : 'checked'}`}
			/>
			<span className={styles['list-item-box__item-name']} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(name) }} />
		</li>
	);
};
