import { GET } from '@/services'
// 查询直播列表
export const getClassLiveList = (timestamp: number) => GET('/classLive/getClassLiveList', { time: timestamp })
