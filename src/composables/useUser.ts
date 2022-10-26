import { useStorage } from '@/hook'
import { UserInfo } from '@tarojs/taro/types/index'

// 获取code
const useCode = ref()
export const useGetCode = async () => {
	const res = await Taro.login()
	if (res.errMsg === 'login:ok') {
		useCode.value = res.code
		console.log('[ 先获取到了code ] >')
		return
	}
	return Taro.showToast({ title: 'code获取失败', icon: 'error', duration: 2000 })
}

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

//登录函数
export const useUserLogin = async () => {
	// Taro.getUserProfile({
	// 	desc: '用于完善用户信息',
	// 	async success(user) {
	// 		const code = await getCode()
	// 		console.log('[ code ] >', code)
	// 		if (!code) return Taro.showToast({ title: 'code获取失败', icon: 'error', duration: 2000 })
	// 		useUserInfo.value = { ...user.userInfo }
	// 		const parmas = {
	// 			code,
	// 			encryptedData: user.encryptedData,
	// 			iv: user.iv
	// 		}
	// 		const { data: res, statusCode } = await api.loginApi(parmas)
	// 		// 已经登录过 返回token
	// 		if (res.token) {
	// 			//储存 token
	// 			useToken.value = res.token
	// 			if (res.role === '游客') {
	// 				// 储存角色
	// 				useUserInfo.value.role = res.role
	// 				//绑定用户信息逻辑
	// 				Taro.navigateTo({
	// 					url: '/pages/user/components/bindUserInfo'
	// 				})
	// 			}
	// 			return
	// 		}
	// 		if (statusCode === 401) {
	// 			// 未登录过且用户跳转了绑定手机号
	// 			Taro.navigateTo({
	// 				url: '/pages/user/components/bindPhone'
	// 			})
	// 		}
	// 	}
	// })
	console.log('[ 先获取到了user ] >')
	const user = await Taro.getUserProfile({ desc: '用于完善会员资料' })
	console.log('[ res ] >', user)
	const parmas = {
		code: useCode.value,
		encryptedData: user.encryptedData,
		iv: user.iv
	}
	const { data: res, statusCode } = await api.loginApi(parmas)
}
