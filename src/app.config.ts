export default defineAppConfig({
	pages: [
		'pages/user/index', // 我的
		'pages/live/index', // 直播
		'pages/user/components/bindSchool',
		'pages/rent-classroom/index', // 教室借用
		'pages/appointment/index', // 预约教室
		'pages/sign-in/index', // 签到
		'pages/home/index', //主页
		'pages/task-table/index', // 课程表
		'pages/user/components/bindUserInfo',
		'pages/authorization/web-csm-login',
		'pages/user/components/userInfo',
		'pages/rent-classroom/components/add-rent',
		'pages/live/components/video-view'
	],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	},
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
				pagePath: 'pages/user/index',
				iconPath: './assets/tab-bar/user.png',
				selectedIconPath: './assets/tab-bar/user-active.png',
				text: ''
			}
		]
	}
})
