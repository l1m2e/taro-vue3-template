import { GET } from '@/services'
import { IgetSignToDay, IattendanceRecord } from './types'
// 获取签到信息
export const getSignList = (data: IgetSignToDay) => GET('/Interact/checkSign', data)
// 签到
export const signIn = (wifiiSSID: string) => GET('/Interact/sign', { key: wifiiSSID })
// 获取考勤记录
export const getAttendanceRecord = (data: IattendanceRecord) => GET('/Interact/getUserAtn', data)
