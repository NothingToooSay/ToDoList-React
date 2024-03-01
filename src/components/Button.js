import React from 'react'
import style from './../styles/modules/Button.module.css'
import { getClasses } from './../utils/getClasses'

const buttonTypes = {
	primary: 'primary',
	secondary: 'secondary',
}

function Button({ children, type, variant, ...rest }) {
	return (
		<button
			className={getClasses([
				style.button,
				style[`button-${buttonTypes[variant]}`],
			])}
			type={type === 'submit' ? 'submit' : 'button'}
			// To ensure that the button will be of the correct type, even if the prop does not match what is expected.
			{...rest}
		>
			{children}
		</button>
	)
}

function SelectButton({ children, ...rest }) {
	return (
		<select
			className={getClasses([style.button, style.button__select])}
			{...rest}
		>
			{children}
		</select>
	)
}

export { Button, SelectButton }
