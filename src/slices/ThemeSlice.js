import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		currentTheme: localStorage.getItem('theme') || 'light',
	},
	reducers: {
		toggleTheme: state => {
			state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', state.currentTheme)
		},
	},
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
