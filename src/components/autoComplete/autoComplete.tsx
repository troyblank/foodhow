import React from 'react'
import MuiAutocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import styles from './autoComplete.module.css'

export type AutoCompleteProps = {
	id: string
	name?: string
	value: string
	onChange: (value: string) => void
	options: readonly string[]
}

export const AutoComplete = ({
	id,
	name,
	value,
	onChange,
	options,
}: AutoCompleteProps) => (
	<MuiAutocomplete
		id={id}
		className={styles.autocomplete}
		freeSolo={true}
		options={[...options]}
		inputValue={value}
		onInputChange={(_event, newInputValue) => onChange(newInputValue)}
		fullWidth={true}
		size={'small'}
		slotProps={{
			popper: {
				disablePortal: true,
				className: styles.popper,
			},
		}}
		renderInput={(params) => (
			<TextField
				{...params}
				className={styles.textField}
				name={name}
				slotProps={{
					...params.slotProps,
					htmlInput: {
						...params.slotProps.htmlInput,
						'data-1p-ignore': true,
					},
				}}
			/>
		)}
	/>
)
