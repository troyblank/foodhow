import React from 'react';
import styles from './select.module.css';

type SelectOption = {
	value: string;
	label: string;
};

type SelectProps = {
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	id?: string;
	name?: string;
};

export const Select = ({
	value,
	onChange,
	options,
	id,
	name
}: SelectProps) => (
	<select
		className={styles.select}
		value={value}
		onChange={({ target }) => onChange(target.value)}
		id={id}
		name={name}
	>
		{options.map((option) => (
			<option key={option.value} value={option.value}>
				{option.label}
			</option>
		))}
	</select>
);
