import React, { useState } from 'react'
import { type ShoppingListLegendItem } from '../../../types'
import { useAuth } from '../../../contexts'
import { useDeleteShoppingListLegendItem, useSaveShoppingListLegendItem, useShoppingListLegend } from '../../../data'
import { getErrorMessage, isAShoppingListLegendEmoji } from '../../../utils'
import { Input, Modal, Spinner } from '../..'
import styles from './legend.module.css'

export const Legend = () => {
	const { user } = useAuth()
	const { isLoading, isError, data: legend = [], refetch } = useShoppingListLegend(user)
	const { mutateAsync: saveLegendItem, isPending: isSaving } = useSaveShoppingListLegendItem(user)
	const { mutate: deleteLegendItem, isPending: isDeleting } = useDeleteShoppingListLegendItem(user)
	const [emoji, setEmoji] = useState('')
	const [name, setName] = useState('')
	const [isAdding, setIsAdding] = useState(false)
	const [itemToDelete, setItemToDelete] = useState<ShoppingListLegendItem | null>(null)

	// List items store the emoji alone, so a second entry with the same emoji can't be told apart on the list.
	const isEmojiAlreadyUsed = legend.some((item) => item.emoji === emoji.trim())

	const isFormInvalid = !isAShoppingListLegendEmoji(emoji) || 0 === name.trim().length || isEmojiAlreadyUsed

	const resetForm = () => {
		setEmoji('')
		setName('')
	}

	const closeAddForm = () => {
		setIsAdding(false)
		resetForm()
	}

	const onSave = async () => {
		try {
			await saveLegendItem({ emoji: emoji.trim(), name: name.trim() })
			closeAddForm()
		} catch (error) {
			alert(getErrorMessage(error))
		}
	}

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		if (!isFormInvalid && !isSaving) {
			onSave()
		}
	}

	const onConfirmDelete = () => {
		const { id } = itemToDelete
		setItemToDelete(null)
		deleteLegendItem(id, {
			onError: (error) => alert(getErrorMessage(error)),
		})
	}

	return (
		<section className={styles.legend} aria-labelledby={'shopping-list-legend-heading'}>
			<div className={styles.legend__header}>
				<h2 id={'shopping-list-legend-heading'} className={styles.legend__heading}>Legend</h2>
				<button
					type={'button'}
					className={styles.legend__add}
					aria-label={'Add legend item'}
					onClick={() => setIsAdding(true)}
				>
					<svg className={styles.legend__icon} viewBox={'0 0 16 16'} aria-hidden={'true'} focusable={'false'}>
						<path d={'M8 2v12M2 8h12'} />
					</svg>
				</button>
			</div>
			{isLoading && (
				<div className={styles.legend__loading}>
					<Spinner size={'small'} color={'brown'} />
				</div>
			)}
			{isError && (
				<div className={styles.legend__error} role={'alert'}>
					<p className={styles['legend__error-message']}>{'Couldn\'t load the legend.'}</p>
					<button type={'button'} className={styles.legend__retry} onClick={() => refetch()}>
						Try again
					</button>
				</div>
			)}
			{!isLoading && !isError && 0 === legend.length && (
				<p className={styles['legend__empty-message']}>No legend items yet.</p>
			)}
			{legend.length > 0 && (
				<ul className={styles.legend__items}>
					{legend.map((item) => (
						<li key={item.id} className={styles.legend__item}>
							<span className={styles.legend__emoji} aria-hidden={'true'}>{item.emoji}</span>
							<span className={styles.legend__name}>{item.name}</span>
							<button
								type={'button'}
								className={styles.legend__remove}
								aria-label={`Remove ${item.name} from legend`}
								disabled={isDeleting}
								onClick={() => setItemToDelete(item)}
							>
								<svg className={styles.legend__icon} viewBox={'0 0 16 16'} aria-hidden={'true'} focusable={'false'}>
									<path d={'M3 3l10 10M13 3L3 13'} />
								</svg>
							</button>
						</li>
					))}
				</ul>
			)}
			<Modal
				message={'Add a legend item'}
				isShowing={isAdding}
				onConfirm={onSave}
				onCancel={closeAddForm}
				isConfirmDisabled={isFormInvalid}
				isPending={isSaving}
			>
				<form className={styles.legend__form} onSubmit={onSubmit}>
					<div className={styles['legend__form-fields']}>
						<div className={styles['legend__form-field--emoji']}>
							<label htmlFor={'legend-emoji'} className={styles.legend__label}>
								Emoji
							</label>
							<Input
								id={'legend-emoji'}
								name={'emoji'}
								value={emoji}
								onChange={setEmoji}
							/>
						</div>
						<div className={styles['legend__form-field--name']}>
							<label htmlFor={'legend-name'} className={styles.legend__label}>
								Name
							</label>
							<Input
								id={'legend-name'}
								name={'name'}
								value={name}
								onChange={setName}
							/>
						</div>
					</div>
				</form>
			</Modal>
			<Modal
				message={`Remove ${itemToDelete?.name ?? ''} from the legend?`}
				isShowing={null !== itemToDelete}
				onConfirm={onConfirmDelete}
				onCancel={() => setItemToDelete(null)}
			/>
		</section>
	)
}
