import React from 'react'
import dompurify from 'dompurify'
import classnames from 'classnames'
import { type ShoppingListItem as ShoppingListItemType } from '../../../types'
import styles from './shoppingListItem.module.css'

type ShoppingListItemProps = {
    item: ShoppingListItemType
    checked: boolean
    onToggle: (id: number) => void
}

// Emoji are often several code units long, so count user perceived characters instead of string length.
const countCharacters = (value: string) => Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value)).length

export const ShoppingListItem = ({ item, checked, onToggle }: ShoppingListItemProps) => {
	const { name, id, purpose } = item
	const purposeText = purpose?.trim()
	const isPurposeSingleCharacter = Boolean(purposeText) && 1 === countCharacters(purposeText)

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation()
		onToggle(id)
	}

	const statusLabel = checked ? 'checked' : 'unchecked'
	const labelAccessibleName = purposeText ? `${name}, ${purposeText} - ${statusLabel}` : `${name} - ${statusLabel}`

	return (
		<li
			className={classnames(styles['list-item-box'], {
				[styles['list-item-box--with-badge']]: isPurposeSingleCharacter,
			})}
		>
			<label className={styles['list-item-box__label']} aria-label={labelAccessibleName}>
				<input
					type={'checkbox'}
					checked={checked}
					onChange={handleCheckboxChange}
					className={styles['list-item-box__checkbox']}
					aria-label={`Mark ${name} as ${checked ? 'unchecked' : 'checked'}`}
				/>
				<span
					className={classnames(styles['list-item-box__text'], {
						[styles['list-item-box__text--with-badge']]: isPurposeSingleCharacter,
					})}
				>
					<span className={styles['list-item-box__item-name']} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(name) }} />
					{purposeText && !isPurposeSingleCharacter && <span className={styles['list-item-box__purpose']}>{purposeText}</span>}
				</span>
			</label>
			{isPurposeSingleCharacter && <span className={styles['list-item-box__purpose-badge']}>{purposeText}</span>}
		</li>
	)
}
