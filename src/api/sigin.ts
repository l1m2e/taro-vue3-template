import { GET } from '@/services'
import { IgetSignToDayApi } from './types'
// 获取当天签到信息
export const getSignToDayApi = (data: IgetSignToDayApi) => GET('/Interact/getAtn', data)
