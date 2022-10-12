import { GET } from '@/services'
import { IgetSignToDay } from './types'
// 获取当天签到信息
export const getSignToDayApi = (data: IgetSignToDay) => GET('/Interact/getAtn', data)
