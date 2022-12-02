import { GET } from '@/services'
import { InewClassLive } from './types'
// 查询直播列表
export const getClassLiveList = (timestamp: number) => GET('/classLive/getClassLiveList', { time: timestamp })
// 刷新直播列表数据
export const getNewClassLive = (data: InewClassLive) => GET('/classLive/newClassLive', data)
