import { GET } from '@/services'
import type { IgetSignToDay } from './types'
// 获取当天签到信息
export const getSignList = (data: IgetSignToDay) => GET('/Interact/checkSign', data)
