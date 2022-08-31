import { GET } from '@/services'
import { ILogin, IBindPhone, IGetUserInfo } from './types'

const loginApi = (data: ILogin) => GET('/user/login', data)
const bindPhoneApi = (data: IBindPhone) => GET('/user/getPhone', data)
const getUserInfoApi = (data: IGetUserInfo) => GET('/user/getUserInfo', data)

export {
  loginApi,
  bindPhoneApi,
  getUserInfoApi
}
