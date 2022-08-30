import { GET } from '@/services'
import { ILogin, IGetPhone, IGetUserInfo } from './types'

const loginApi = (data: ILogin) => GET('/user/login', data)
const getPhoneApi = (data: IGetPhone) => GET('/user/getPhone', data)
const getUserInfoApi = (data: IGetUserInfo) => GET('/user/getUserInfo', data)

export {
  loginApi,
  getPhoneApi,
  getUserInfoApi
}
