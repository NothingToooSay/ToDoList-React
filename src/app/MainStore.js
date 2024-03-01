import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './../slices/TodoSlice'
import themeReducer from './../slices/ThemeSlice'

export const store = configureStore({
	reducer: {
		todo: todoReducer,
		theme: themeReducer,
	},
})

export default store
