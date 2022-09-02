import { GET, POST } from '@/services'
import { ILogin, IBindPhone, IBindUserInfo } from './types'

const loginApi = (data: ILogin) => GET('/user/login', data)
const bindPhoneApi = (data: IBindPhone) => GET('/user/bindPhone', data)
const bindUserInfoApi = (data: IBindUserInfo) => POST('/user/bindSchoolUser', data)
const getUserInfoApi = () => GET('/user/UserInfo')

export {
  loginApi,
  bindPhoneApi,
  bindUserInfoApi,
  getUserInfoApi
}
