import React, { useEffect } from 'react'
import style from './../styles/modules/SwitchButton.module.css'
import { toggleTheme } from './../slices/ThemeSlice'
import { useDispatch, useSelector } from 'react-redux'

function SwitchButton() {
	const dispatch = useDispatch()
	const currentTheme = useSelector(state => state.theme.currentTheme)
	// get current theme from redux state

	const handleToggle = () => {
		dispatch(toggleTheme()) // click handler
	}

	const buttonClass =
		currentTheme === 'light' ? style.lightTheme : style.darkTheme

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme')
		if (storedTheme) {
			dispatch(toggleTheme())
		} else {
			localStorage.setItem('theme', 'light')
			dispatch(toggleTheme())
		}
	}, [dispatch])
	// will run only once when mounting the component

	useEffect(() => {
		document.body.style.backgroundColor =
			currentTheme === 'light' ? '#f8f8ff' : '#3b3a3d'
	}, [currentTheme])

	return (
		<div>
			<button
				className={`${style.button} ${buttonClass}`}
				onClick={handleToggle}
			>
				Toggle Theme
			</button>
		</div>
	)
}

export default SwitchButton
