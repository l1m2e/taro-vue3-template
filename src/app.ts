import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useToken } from '@/composables'
import 'uno.css'
import './app.scss'
import './app.scss'

const App = createApp({
	async onLaunch() {
		if (!useToken) {
			const code = await Taro.login()
			if (code.errMsg !== 'login:ok') return Taro.showToast({ title: 'code获取失败', icon: 'error', duration: 2000 })
			// 请求登陆api
		}
	}
	// // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())

export default App
