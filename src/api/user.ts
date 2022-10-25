import { GET, POST } from '@/services'
import { ILogin, IBindPhone, IBindUserInfo, ISchoolList } from './types'

// 登录
export const loginApi = (data: ILogin) => GET('/user/login', data)
// 绑定手机
export const bindPhoneApi = (data: IBindPhone) => GET('/user/bindPhone', data)
// 绑定用户信息
export const bindUserInfoApi = (data: IBindUserInfo) => POST('/user/bindSchoolUser', data)
// 获取用户信息
export const getUserInfoApi = () => GET('/user/UserInfo')
//获取学校列表
export const getSchoolList = (data: ISchoolList) =>
	new Promise<Taro.request.SuccessCallbackResult>((resolve) => {
		Taro.request({
			method: 'POST',
			header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', token: Taro.getStorageSync('token'), Accept: 'application/json' },
			url: `http://www.lta-yun.com/school/querySchool`,
			data,
			success: (res: Taro.request.SuccessCallbackResult) => {
				resolve(res)
			}
		})
	})
