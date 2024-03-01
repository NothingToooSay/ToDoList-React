import React from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import TodoItem from './TodoItem'
import style from './../styles/modules/App.module.css'

const container = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			staggerChildren: 0.2, // child elements will animate at 0.2 intervals
		},
	},
}

const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
}

function AppContent() {
	const todoList = useSelector(state => state.todo.todoList)
	// get a list of tasks from redux
	// console.log(todoList)

	const filterStatus = useSelector(state => state.todo.filterStatus)

	const sortedTodoList = [...todoList]
	sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time))
	// sort by date

	const filteredTodoList = sortedTodoList.filter(item => {
		if (filterStatus === 'all') {
			return true
		}
		return item.status === filterStatus
	})
	return (
		<motion.div
			className={style.content_wrapper}
			variants={container}
			initial='hidden'
			animate='visible'
		>
			<AnimatePresence>
				{filteredTodoList && filteredTodoList.length > 0 ? (
					filteredTodoList.map(todo => <TodoItem key={todo.id} todo={todo} />)
				) : (
					<motion.p className={style.emptyText} variants={child}>
						Todo Not Found
					</motion.p>
				)}
			</AnimatePresence>
		</motion.div>
	)
	// return our todoItem
}

export default AppContent
