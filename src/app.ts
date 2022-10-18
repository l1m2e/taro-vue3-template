import { createApp } from 'vue'
import './app.scss'
import setNutUi from './nutui'
import { createPinia } from 'pinia'
import 'uno.css'
import './app.scss'
const App = createApp({
	// onShow (options) {},
	// // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())
setNutUi(App)

export default App
