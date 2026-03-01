import React from 'react'
import dompurify from 'dompurify'
import { type ShoppingListItem as ShoppingListItemType } from '../../../types'
import styles from './shoppingListItem.module.css'

type ShoppingListItemProps = {
    item: ShoppingListItemType
    checked: boolean
    onToggle: (id: number) => void
}

export const ShoppingListItem = ({ item, checked, onToggle }: ShoppingListItemProps) => {
	const { name, id } = item

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation()
		onToggle(id)
	}

	return (
		<li className={styles['list-item-box']}>
			<label
				className={styles['list-item-box__label']}
				aria-label={`${name} - ${checked ? 'checked' : 'unchecked'}`}
			>
				<input
					type={'checkbox'}
					checked={checked}
					onChange={handleCheckboxChange}
					className={styles['list-item-box__checkbox']}
					aria-label={`Mark ${name} as ${checked ? 'unchecked' : 'checked'}`}
				/>
				<span className={styles['list-item-box__item-name']} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(name) }} />
			</label>
		</li>
	)
}
