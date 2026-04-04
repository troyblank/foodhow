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
	const { name, id, purpose } = item
	const purposeText = purpose?.trim()

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation()
		onToggle(id)
	}

	const statusLabel = checked ? 'checked' : 'unchecked'
	const labelAccessibleName = purposeText ? `${name}, ${purposeText} - ${statusLabel}` : `${name} - ${statusLabel}`

	return (
		<li className={styles['list-item-box']}>
			<label className={styles['list-item-box__label']} aria-label={labelAccessibleName}>
				<input
					type={'checkbox'}
					checked={checked}
					onChange={handleCheckboxChange}
					className={styles['list-item-box__checkbox']}
					aria-label={`Mark ${name} as ${checked ? 'unchecked' : 'checked'}`}
				/>
				<span className={styles['list-item-box__text']}>
					<span className={styles['list-item-box__item-name']} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(name) }} />
					{purposeText && <span className={styles['list-item-box__purpose']}>{purposeText}</span>}
				</span>
			</label>
		</li>
	)
}
