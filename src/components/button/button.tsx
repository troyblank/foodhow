import React, { useCallback, type FunctionComponent } from 'react'
import { Spinner } from '..'
import styles from './button.module.css'

type ButtonProps = {
    text: string
    buttonClickHand: () => void
    isPending?: boolean
    disabled?: boolean
}

export const Button: FunctionComponent<ButtonProps> = ({ text, buttonClickHand, isPending = false, disabled = false }) => {
	const isDisabled = isPending || disabled

	const onClick = useCallback(() => {
		// istanbul ignore else -- disabled buttons do not receive click events so this path is unreachable in tests
		if (!isDisabled) {
			buttonClickHand()
		}
	}, [buttonClickHand, isDisabled])

	return (
		<button
			className={`${styles.button} ${isDisabled ? styles['button--disabled'] : ''}`}
			onClick={onClick}
			aria-label={isPending ? 'Pending...' : text}
			aria-busy={isPending}
			disabled={isDisabled}
			type={'button'}
		>
			{isPending ? (
				<Spinner size={'small'} />
			) : (
				text
			)}
		</button>
	)
}
