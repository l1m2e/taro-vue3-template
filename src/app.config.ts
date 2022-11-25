export default defineAppConfig({
	pages: [
		'pages/course/index', // 课程
		'pages/course/components/video-view', // 查看直播
		'pages/user/index', // 我的
		'pages/rent-classroom/index', // 教室借用
		'pages/task-table/index', // 课程表
		'pages/setting/index', // 设置
		'pages/user/components/change-avatar', //修改头像
		'pages/authorization/web-csm-login', // 授权网页登录
		'pages/user/components/bindSchool', //绑定学校
		'pages/sign-in/index', // 签到
		'pages/home/index', //主页
		'pages/user/components/bindUserInfo', // 绑定用户信息
		'pages/appointment/index', // 预约教室
		'pages/user/components/userInfo', // 用户信息页面
		'pages/rent-classroom/components/add-rent' // 添加借用
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
			// {
			// 	pagePath: 'pages/home/index',
			// 	iconPath: './assets/tab-bar/home.png',
			// 	selectedIconPath: './assets/tab-bar/home-active.png',
			// 	text: ''
			// },
			{
				pagePath: 'pages/course/index',
				iconPath: './assets/tab-bar/course.png',
				selectedIconPath: './assets/tab-bar/course-active.png',
				text: '课程'
			},
			{
				pagePath: 'pages/task-table/index',
				iconPath: './assets/tab-bar/task.png',
				selectedIconPath: './assets/tab-bar/task-active.png',
				text: '课程表'
			},
			{
				pagePath: 'pages/rent-classroom/index',
				iconPath: './assets/tab-bar/rent.png',
				selectedIconPath: './assets/tab-bar/rent-active.png',
				text: '借用'
			},
			{
				pagePath: 'pages/user/index',
				iconPath: './assets/tab-bar/user.png',
				selectedIconPath: './assets/tab-bar/user-active.png',
				text: '我的'
			}
		]
	},
	// 配置权限
	requiredPrivateInfos: ['getLocation'],
	permission: {
		'scope.userLocation': {
			desc: '用于筛选位置'
		}
	}
})
