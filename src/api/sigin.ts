import { GET, POST } from '@/services'
import { IgetSignToDay, IattendanceRecord, Iretroactive } from './types'
// 获取签到信息
export const getSignList = (data: IgetSignToDay) => GET('/Interact/checkSign', data)
// 签到
export const signIn = (wifiiSSID: string) => GET('/Interact/sign', { key: wifiiSSID })
// 获取考勤记录
export const getAttendanceRecord = (data: IattendanceRecord) => GET('/Interact/getUserAtn', data)
// 补签
export const retroactive = (data: Iretroactive) => POST('/Interact/retroactive', data)
