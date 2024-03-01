import React, { useState, useEffect } from 'react'
import style from './../styles/modules/TodoItem.module.css'
import { getClasses } from '../utils/getClasses'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from './../slices/TodoSlice'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import TodoModal from './TodoModal'
import CheckButton from './CheckButton'

const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
}

function TodoItem({ todo }) {
	const dispatch = useDispatch()
	const [checked, setChecked] = useState(false)
	const [updateModalOpen, setUpdateModalOpen] = useState(false)

	useEffect(() => {
		if (todo.status === 'complete') {
			setChecked(true)
		} else {
			setChecked(false)
		}
	}, [todo.status])

	const handleDelete = () => {
		// console.log('deleting')
		dispatch(deleteTodo(todo.id))
		toast.success('Todo Deleted Successfully')
	}

	const handleUpdate = () => {
		// console.log('updating')
		setUpdateModalOpen(true)
	}

	const handleCheck = () => {
		// console.log('update todo')
		setChecked(!checked)
		dispatch(
			updateTodo({
				...todo,
				status: checked ? 'incomplete' : 'complete',
			})
		)
	}

	return (
		<>
			<motion.div className={style.item} variants={child}>
				<div className={style.todoDetails}>
					<CheckButton checked={checked} handleCheck={handleCheck} />
					<div className={style.texts}>
						<p
							className={getClasses([
								style.todoText,
								todo.status === 'complete' && style['todoText--completed'],
							])}
						>
							{todo.title}
						</p>
						<p className={style.time}>{todo.time}</p>
					</div>
				</div>
				<div className={style.todoActions}>
					<div
						className={style.icon}
						onClick={handleDelete}
						onKeyDown={handleDelete}
						role='button'
						tabIndex={0}
					>
						<MdDelete />
					</div>
					<div
						className={style.icon}
						onClick={handleUpdate}
						onKeyDown={handleDelete}
						role='button'
						tabIndex={0}
					>
						<MdEdit />
					</div>
				</div>
			</motion.div>
			<TodoModal
				type='Update'
				modalOpen={updateModalOpen}
				setModalOpen={setUpdateModalOpen}
				todo={todo}
			/>
		</>
	)
}

export default TodoItem
