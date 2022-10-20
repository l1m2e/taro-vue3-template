import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TaroUiVue3 from './taro-ui-vue3'
import './app.scss'

import 'uno.css'
import './app.scss'
const App = createApp({
	// onShow (options) {},
	// // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())
App.use(TaroUiVue3)

export default App
