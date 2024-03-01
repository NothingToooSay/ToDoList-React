import React from 'react'
import { Toaster } from 'react-hot-toast'
import MainTitle from './components/MainTitle'
import AppHeader from './components/AppHeader'
import AppContent from './components/AppContent'
import SwitchButton from './components/SwitchButton'
import style from './styles/modules/App.module.css'

function App() {
	return (
		<>
			<div className='container'>
				<div className={style.header_wrapper}>
					<MainTitle>task manager</MainTitle>
					<SwitchButton />
				</div>
				<div className={style.app_wrapper}>
					<AppHeader />
					<AppContent />
				</div>
			</div>
			<Toaster
				position='bottom-right'
				toastOption={{
					style: {
						fontSize: '2rem',
					},
				}}
			/>
		</>
	)
}

export default App
