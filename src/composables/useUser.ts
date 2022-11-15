import { useStorage } from './useStorage'

//用户状态
export const useUserInfo = useStorage('useInfo', {
	nickName: '', //微信名称
	avatarUrl: '', //微信头像
	role: '', // 当前用户角色
	studentName: '', //用户和学校绑定的真实姓名
	schoolName: '', // 用户绑定的学校名称
	studentId: '', //学号和工号
	cardId: '', //卡号
	gender: '', // 性别 0未知 1男 2女
	className: '' // 班别
})
// token
export const useToken = useStorage('token', '')
// 用户登录状态
export const useLoginState = computed(() => useToken.value && useUserInfo.value.nickName)

//检查如果Sessionkey 是否过期 如果Sessionkey 过期重新执行登录函数
export const useCheckSessionkey = async () => {
	if (useToken.value) {
		Taro.checkSession({
			fail() {
				useLogin()
			}
		})
	}
}

// 登录函数
export const useLogin = async () => {
	const { code } = await Taro.login()
	const { data: res, statusCode } = await api.loginApi({ code })
	if (statusCode === 200) {
		useToken.value = res.token
		useUserInfo.value.role = res.role
	}
	//获取用户头像信息 以及学校信息
	const userRes = await api.getUserInfoApi()
	if (userRes.statusCode === 200) {
		if (userRes.data.nickName) {
			useUpdateUserInfo(userRes.data)
		} else {
			Taro.navigateTo({ url: '/pages/authorization/getUserInfo' })
		}
		if (res.role !== '游客') {
			//若非游客赋值学校信息
			useUpdateUserInfo(userRes.data.schoolUser)
		}
	}
}

// 获取微信用户信息
export const useWeChatUserInfo = () => {
	Taro.getUserProfile({
		desc: '用于完善用户信息',
		async success(user) {
			useUpdateUserInfo(user.userInfo) // 更新用户信息
			const res = await api.saveUserInfo({ encryptedData: user.encryptedData, iv: user.iv })
			if (res.statusCode === 200) {
				Taro.showToast({ title: '授权成功', icon: 'none', duration: 2000 })
				if (useUserInfo.value.role === '游客') {
					Taro.navigateTo({ url: '/pages/user/components/bindUserInfo' })
				}
			}
		}
	})
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
