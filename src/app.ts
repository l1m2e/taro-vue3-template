import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'uno.css'
import './app.scss'
import './app.scss'

const App = createApp({
	async onLaunch() {}
})
App.use(createPinia())

export default App
