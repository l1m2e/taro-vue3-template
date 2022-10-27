import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserLogin } from '@/composables'
import 'uno.css'
import './app.scss'
import './app.scss'

const App = createApp({
	async onLaunch() {
		// useUserLogin()
	}
})
App.use(createPinia())

export default App
