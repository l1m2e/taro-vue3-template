export default defineAppConfig({
	pages: [
		'pages/authorization/getUserInfo', // 获取用户信息 微信
		'pages/user/components/bindUserInfo', // 绑定用户信息
		'pages/user/index', // 我的
		'pages/sign-in/index', // 签到
		'pages/rent-classroom/index', // 教室借用
		'pages/appointment/index', // 预约教室
		'pages/live/index', // 直播
		'pages/user/components/bindSchool',
		'pages/home/index', //主页
		'pages/task-table/index', // 课程表
		'pages/authorization/web-csm-login', // 授权网页登录
		'pages/user/components/userInfo', // 用户信息页面
		'pages/rent-classroom/components/add-rent', // 添加借用
		'pages/live/components/video-view' // 查看直播
	],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	},
	// 导航栏
	tabBar: {
		color: '#ccc',
		selectedColor: '#4988fd',
		backgroundColor: '#fafafa',
		borderStyle: 'white',
		list: [
			{
				pagePath: 'pages/home/index',
				iconPath: './assets/tab-bar/home.png',
				selectedIconPath: './assets/tab-bar/home-active.png',
				text: ''
			},
			{
				pagePath: 'pages/task-table/index',
				iconPath: './assets/tab-bar/task.png',
				selectedIconPath: './assets/tab-bar/task-active.png',
				text: ''
			},
			{
				pagePath: 'pages/user/index',
				iconPath: './assets/tab-bar/user.png',
				selectedIconPath: './assets/tab-bar/user-active.png',
				text: ''
			}
		]
	}
})
