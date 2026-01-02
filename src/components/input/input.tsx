import React from 'react';
import styles from './input.module.css';

type InputProps = {
    value: string;
    onChange: (value: string) => void;
    type?: 'text' | 'number' | 'email';
    id?: string;
    name?: string;
    autoFocus?: boolean;
};

export const Input = ({
	value,
	onChange,
	type = 'text',
	id,
	name,
	autoFocus = false
}: InputProps) => (
	<input
		className={styles.input}
		type={type}
		value={value}
		onChange={({ target }) => onChange(target.value)}
		id={id}
		name={name}
		data-1p-ignore={true}
		autoFocus={autoFocus}
	/>
);
