import React, { type FunctionComponent } from 'react';
import styles from './spinner.module.css';

type SpinnerProps = {
    size?: 'small' | 'medium' | 'large';
    color?: 'cream' | 'brown';
};

export const Spinner: FunctionComponent<SpinnerProps> = ({ size = 'medium', color = 'cream' }) => {
	const className = `${styles.spinner} ${styles[`spinner--${size}`]} ${styles[`spinner--${color}`]}`;

	return <span className={className} aria-label={'Loading'} />;
};
