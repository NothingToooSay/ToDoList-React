import React from 'react'
import style from './../styles/modules/TodoItem.module.css'
import { ReactComponent as CheckIcon } from './../svg/check.svg'
import { ReactComponent as CancelIcon } from './../svg/cancel.svg'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const checkVariants = {
	initial: {
		color: '#fff',
	},
	checked: {
		pathLength: 1,
	},
	unСhecked: {
		pathLength: 0,
	},
}

const boxVariant = {
	checked: {
		background: 'green',
		transition: { duration: 0.1 },
	},
	unСhecked: {
		background: 'red',
		transition: { duration: 0.1 },
	},
}

function CheckButton({ checked, handleCheck }) {
	const pathLength = useMotionValue(0)
	const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

	return (
		<motion.div
			className={style.svgBox}
			variants={boxVariant}
			animate={checked ? 'checked' : 'unСhecked'}
			onClick={handleCheck}
		>
			<motion.div className={style.svg}>
				{checked ? <CheckIcon /> : <CancelIcon />}
			</motion.div>
		</motion.div>
	)
}

export default CheckButton
