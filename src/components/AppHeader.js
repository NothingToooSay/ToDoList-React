import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, SelectButton } from './Button'
import TodoModal from './TodoModal'
import style from '../styles/modules/App.module.css'
import { updateFilterStatus } from '../slices/TodoSlice'

function AppHeader(e) {
	const [modalOpen, setModalOpen] = useState(false)
	const filterStatus = useSelector(state => state.todo.filterStatus)
	const dispatch = useDispatch()

	const updateFilter = e => {
		// console.log('updating select')

		dispatch(updateFilterStatus(e.target.value))
	}

	return (
		<div className={style.appHeader}>
			<Button variant='primary' onClick={() => setModalOpen(true)} type='Add'>
				Add Task
			</Button>
			<SelectButton id='status' value={filterStatus} onChange={updateFilter}>
				<option value='all'>ALL</option>
				<option value='incomplete'>Incomplete</option>
				<option value='complete'>Complete</option>
			</SelectButton>
			<TodoModal type='Add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	)
}

export default AppHeader
