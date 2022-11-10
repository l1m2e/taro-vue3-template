import { GET } from '@/services'
import type { IgetSignToDay } from './types'
// 获取签到信息
export const getSignList = (data: IgetSignToDay) => GET('/Interact/checkSign', data)
// 签到
export const signIn =  (wifiiSSID:string) => GET('/Interact/sign',{key:wifiiSSID})