import { useStorage } from '@/hook'
import { UserInfo } from '@tarojs/taro/types/index'
interface IUserInfo extends UserInfo {
	role?: string
}

//用户状态
export const useUserInfo = useStorage<IUserInfo>('useInfo', {
	nickName: '',
	avatarUrl: '',
	country: '',
	province: '',
	city: '',
	language: 'zh_CN',
	role: ''
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
			useUserInfo.value = { ...useUserInfo.value, ...user.userInfo }
			const parmas = {
				encryptedData: user.encryptedData,
				iv: user.iv
			}
			const res = await api.saveUserInfo(parmas)
			if (res.statusCode !== 200) return Taro.showToast({ title: '登录失败', icon: 'error', duration: 2000 })
		}
	})
}

const login = async () => {
	const { code } = await Taro.login()
	const { data: res, statusCode } = await api.loginApi({ code })
	if (statusCode === 200) {
		useToken.value = res.token
		useUserInfo.value.role = res.role
	}
}
