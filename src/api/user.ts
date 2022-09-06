import { GET, POST } from '@/services'
import { ILogin, IBindPhone, IBindUserInfo } from './types'

export const loginApi = (data: ILogin) => GET('/user/login', data)
export const bindPhoneApi = (data: IBindPhone) => GET('/user/bindPhone', data)
export const bindUserInfoApi = (data: IBindUserInfo) => POST('/user/bindSchoolUser', data)
export const getUserInfoApi = () => GET('/user/UserInfo')


