import { createUI } from 'taro-ui-vue3'
import { AtTabs, AtTabsPane } from 'taro-ui-vue3/lib'

// 引用上述组件对应的样式文件
import 'taro-ui-vue3/dist/style/components/tabs.scss'

// 引用部分组件
const TaroUiVue3 = createUI({
	AtTabs,
	AtTabsPane
})

export default TaroUiVue3
