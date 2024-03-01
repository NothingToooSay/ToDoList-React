import React from 'react'
import style from '../styles/modules/MainTitle.module.css'

function MainTitle({ children, ...rest }) {
	return (
		<p className={style.title} {...rest}>
			{children}
		</p>
	)
}

export default MainTitle
