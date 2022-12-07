import { createApp } from 'vue'
import { useUserInfoAsync } from '@/composables'
import 'uno.css'
import './app.scss'
import './app.scss'
const App = createApp({
	async onLaunch() {
		useUserInfoAsync()
	}
})

export default App
