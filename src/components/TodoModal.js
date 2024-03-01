import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import style from './../styles/modules/TodoModal.module.css'
import { MdOutlineClose } from 'react-icons/md'
import { Button } from './Button'
import { addTodo, updateTodo } from './../slices/TodoSlice'
import { v4 as uuid } from 'uuid'
import { motion, AnimatePresence } from 'framer-motion'

const dropAnimate = {
	hidden: {
		opacity: 0,
		transform: 'scale(0.8)',
	},
	visible: {
		transform: 'scale(1)',
		opacity: 1,
		transition: {
			duration: 1.5,
			type: 'spring',
			damping: 30,
			stiffness: 600,
		},
	},
	exit: {
		transform: 'scale(0.8)',
		opacity: 0,
	},
}

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
	const [title, setTitle] = useState('')
	const [status, setStatus] = useState('incomplete')
	const dispatch = useDispatch()

	useEffect(() => {
		if (type === 'Update' && todo) {
			setTitle(todo.title)
			setStatus(todo.status)
		} else {
			setTitle('')
			setStatus('incomplete')
		}
	}, [type, todo, modalOpen])

	const handleSubmit = e => {
		e.preventDefault()
		// console.log({ title, status }) check for sending data via submit

		if (title === '') {
			toast.error('Please enter a title')
			return
		}

		if (title && status) {
			// dispatch (send) a Redux action to add a new task to the to-do list
			if (type === 'Add') {
				dispatch(
					addTodo({
						id: uuid(),
						title,
						status,
						time: new Date().toLocaleString(),
					})
				)
				toast.success('Task Added Successfully')
				setModalOpen(false)
			}
			if (type === 'Update') {
				if (todo.title !== title || todo.status !== status) {
					dispatch(
						updateTodo({
							...todo,
							title,
							status,
						})
					)
					toast.success('Task Updated Successfully')
					setModalOpen(false)
				} else {
					toast.error('No Changes Made')
				}
			}
		}
	}

	return (
		<AnimatePresence>
			{modalOpen && (
				<motion.div
					className={style.wrapper}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={style.container}
						variants={dropAnimate}
						initial='hidden'
						animate='visible'
						exit='exit'
					>
						<motion.div
							className={style.closeButton}
							onClick={() => setModalOpen(false)}
							onKeyDown={() => setModalOpen(false)}
							tabIndex={0}
							role='button'
							initial={{ top: 50, opacity: 0 }}
							animate={{ top: -15, opacity: 1 }}
							exit={{ top: 50, opacity: 0 }}
						>
							<MdOutlineClose />
						</motion.div>
						<form className={style.form} onSubmit={e => handleSubmit(e)}>
							<h1 className={style.formTitle}>
								{type === 'Add' ? 'Add' : 'Update'} Task
							</h1>
							<label htmlFor='title'>
								Title
								<input
									type='text'
									id='title'
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</label>
							<label htmlFor='status'>
								Status
								<select
									name='status'
									id='status'
									value={status}
									onChange={e => setStatus(e.target.value)}
								>
									<option value='incomplete'>Incomplete</option>
									<option value='complete'>Complete</option>
								</select>
							</label>
							<div className={style.buttonContainer}>
								<Button type='submit' variant='primary'>
									{type === 'Add' ? 'Add' : 'Update'} Task
								</Button>
								<Button
									type='button'
									variant='secondary'
									onClick={() => setModalOpen(false)}
									onKeyDown={() => setModalOpen(false)}
								>
									Close
								</Button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default TodoModal
