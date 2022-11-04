import { useStorage } from '@/hook'

//用户状态
export const useUserInfo = useStorage('useInfo', {
	nickName: '', //微信名称
	avatarUrl: '', //微信头像
	role: '', // 当前用户角色
	name: '', //用户和学校绑定的真实姓名
	schoolName: '', // 用户绑定的学校名称
	studentId: '', //学号和工号
	cardId: '', //卡号
	gender: '', // 性别 0未知 1男 2女
	className: '' // 班别
})
export const useToken = useStorage('token', '')

// 登录函数
export const useUserLogin = async () => {
	if (!useToken.value) {
		//如果没有token 直接登录
		login()
	} else {
		Taro.checkSession({
			fail() {
				//如果Sessionkey 过期
				login()
			}
		})
	}
	Taro.getUserProfile({
		desc: '用于完善用户信息',
		async success(user) {
			useUpdateUserInfo(user.userInfo)
			const parmas = {
				encryptedData: user.encryptedData,
				iv: user.iv
			}
			const res = await api.saveUserInfo(parmas)
			if (res.statusCode !== 200) {
				// useLogout()
				return Taro.showToast({ title: '登录失败', icon: 'error', duration: 2000 })
			}
			//根据用户身份判断是否要进一步绑定用户信息
			if (useUserInfo.value.role === '游客') {
				Taro.navigateTo({ url: '/pages/user/components/bindUserInfo' })
			}
		},
		fail() {
			useLogout()
		}
	})
}
// 获取token 以及 更新 用户信息 和 Sessionkey
const login = async () => {
	const { code } = await Taro.login()
	const { data: res, statusCode } = await api.loginApi({ code })
	if (statusCode === 200) {
		useToken.value = res.token
		useUserInfo.value.role = res.role
		if (res.role !== '游客') {
			const userInfoRes = await api.getUserInfoApi()
			useUpdateUserInfo(userInfoRes.data.schoolUser)
		}
	}
}

// 更新用户信息
export const useUpdateUserInfo = (data: any) => {
	for (let key in data) {
		if (key in useUserInfo.value) {
			useUserInfo.value[key] = data[key]
		}
	}
}

//登出
export const useLogout = () => {
	useToken.value = ''
	for (let key in useUserInfo.value) {
		useUserInfo.value[key] = ''
	}
}
