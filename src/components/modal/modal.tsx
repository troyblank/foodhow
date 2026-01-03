import React, { type FunctionComponent, type ReactNode } from 'react';
import { Button } from '..';
import styles from './modal.module.css';

type ModalProps = {
    message: string;
    isShowing: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    children?: ReactNode;
    isConfirmDisabled?: boolean;
    isPending?: boolean;
};

export const Modal: FunctionComponent<ModalProps> = ({
	message,
	isShowing,
	onConfirm,
	onCancel,
	children,
	isConfirmDisabled = false,
	isPending = false
}) => isShowing && (
	<div className={styles.overlay} onMouseDown={onCancel}>
		<div
			className={styles.modal}
			onMouseDown={(event) => event.stopPropagation()}
			role={'dialog'}
			aria-modal={'true'}
		>
			<p className={styles.message}>{message}</p>
			{children}
			<div className={styles.actions}>
				<Button text={'Cancel'} buttonClickHand={onCancel} disabled={isPending} />
				<Button text={'Confirm'} buttonClickHand={onConfirm} disabled={isConfirmDisabled} isPending={isPending} />
			</div>
		</div>
	</div>
);
