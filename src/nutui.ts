import { App } from 'vue'
import {
	Button,
	Icon,
	Dialog,
	Cell,
	Steps,
	Step,
	CellGroup,
	Toast,
	OverLay,
	Popup,
	Image,
	Notify,
	Avatar,
	Layout,
	Row,
	Col,
	Form,
	FormItem,
	Picker,
	Divider,
	Tabs,
	TabPane,
	Calendar,
	Input,
	TextArea
} from '@nutui/nutui-taro'

const setNutUi = (app: App) => {
	app
		.use(Button)
		.use(Icon)
		.use(Dialog)
		.use(Cell)
		.use(Steps)
		.use(Step)
		.use(CellGroup)
		.use(Toast)
		.use(OverLay)
		.use(Popup)
		.use(Image)
		.use(Notify)
		.use(Avatar)
		.use(Layout)
		.use(Row)
		.use(Col)
		.use(Form)
		.use(FormItem)
		.use(Picker)
		.use(Divider)
		.use(Tabs)
		.use(TabPane)
		.use(Calendar)
		.use(Input)
		.use(TextArea)
}

export default setNutUi
