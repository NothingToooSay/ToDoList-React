import { createSlice } from '@reduxjs/toolkit'

const getInitialTodo = () => {
	const localTodoList = window.localStorage.getItem('todoList')
	return localTodoList ? JSON.parse(localTodoList) : []
}

const updateLocalStorage = todoList => {
	try {
		window.localStorage.setItem('todoList', JSON.stringify(todoList))
	} catch (error) {
		console.error('Error updating local storage:', error)
	}
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		filterStatus: 'all',
		todoList: getInitialTodo(),
	},
	reducers: {
		addTodo: (state, action) => {
			const newTodoList = [...state.todoList, action.payload]
			updateLocalStorage(newTodoList)
			state.todoList = newTodoList
		},
		deleteTodo: (state, action) => {
			const newTodoList = state.todoList.filter(
				todo => todo.id !== action.payload
			)
			updateLocalStorage(newTodoList)
			state.todoList = newTodoList
		},
		updateTodo: (state, action) => {
			const newTodoList = state.todoList.map(todo => {
				return todo.id === action.payload.id
					? {
							...todo,
							title: action.payload.title,
							status: action.payload.status,
					  }
					: todo
			})
			updateLocalStorage(newTodoList)
			state.todoList = newTodoList
		},
		updateFilterStatus: (state, action) => {
			state.filterStatus = action.payload
		},
	},
})

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
	todoSlice.actions
export default todoSlice.reducer
