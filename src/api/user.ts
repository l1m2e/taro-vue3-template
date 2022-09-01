import { GET, POST } from '@/services'
import { ILogin, IBindPhone, IGetUserInfo, IBindUserInfo } from './types'

const loginApi = (data: ILogin) => GET('/user/login', data)
const bindPhoneApi = (data: IBindPhone) => GET('/user/bindPhone', data)
const getUserInfoApi = (data: IGetUserInfo) => GET('/user/getUserInfo', data)
const bindUserInfoApi = (data: IBindUserInfo) => POST('/school/bindUserInfo', data)
export {
  loginApi,
  bindPhoneApi,
  getUserInfoApi,
  bindUserInfoApi
}
