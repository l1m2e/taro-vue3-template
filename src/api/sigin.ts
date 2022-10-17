import { GET } from '@/services'
import type { IgetSignToDay } from './types'
// 获取当天签到信息
export const getSignToDayApi = (data: IgetSignToDay) => GET('/Interact/getAtn', data)
