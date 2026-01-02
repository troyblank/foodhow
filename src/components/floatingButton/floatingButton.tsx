import React, { type FunctionComponent } from 'react';
import styles from './floatingButton.module.css';

type FloatingButtonProps = {
    onClick?: () => void;
    ariaLabel: string;
};

export const FloatingButton: FunctionComponent<FloatingButtonProps> = ({ onClick, ariaLabel }) => (
	<button
		className={styles['floating-button']}
		type={'button'}
		aria-label={ariaLabel}
		onClick={onClick}
	>
		+
	</button>
);
