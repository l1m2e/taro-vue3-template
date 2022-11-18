import { baseUrl } from '@/config/baseUrl'
import { useStorage } from './useStorage'
import Svg from '@/assets/img/image'

//用户状态
export const useUserInfo = useStorage('useInfo', {
	avatarUrl: Svg.baseAvatar, // 头像
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
// 用户是否已经绑定信息
export const useIsBindUserInfo = computed(() => useToken.value && useUserInfo.value.studentName)

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
	Taro.showLoading({ title: '登录中' })
	const { code } = await Taro.login()
	const { data: res, statusCode } = await api.loginApi({ code })
	if (statusCode === 200) {
		Taro.hideLoading()
		useToken.value = res.token
		useUserInfo.value.role = res.role
		res.role === '游客' ? Taro.navigateTo({ url: '/pages/user/components/bindUserInfo' }) : useGetUserInfo()
	} else {
		Taro.showToast({ title: '登录失败', icon: 'error', duration: 2000 })
	}
}

//获取用户头像信息 以及学校信息
export const useGetUserInfo = async () => {
	if (useUserInfo.value.role !== '游客') {
		console.log('[  ] >', useUserInfo.value.role)
		const res = await api.getUserInfoApi()
		if (res.statusCode === 200) {
			res.data.avatarUrl = `${baseUrl.value}/applet/image/avatar/${res.data.avatarUrl}`
			useUpdateUserInfo(res.data)
			useUpdateUserInfo(res.data.schoolUser)
		} else {
			Taro.showToast({ title: '获取用户信息失败', icon: 'error', duration: 2000 })
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
