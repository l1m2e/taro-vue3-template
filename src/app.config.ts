export default defineAppConfig({
	pages: [
		'pages/user/index',
		'pages/user/components/bindSchool',
		'pages/user/components/bindUserInfo',
		'pages/home/index',
		'pages/authorization/web-csm-login',
		'pages/rent-classroom/index',
		'pages/sign-in/index',
		'pages/task-table/index',
		'pages/user/components/userInfo',
		'pages/appointment/index',
		'pages/rent-classroom/components/add-rent'
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
