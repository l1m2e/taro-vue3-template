import { GET } from '@/services'
import { IGetCourseList } from './types'
//获取所有楼层
export const getFloorApi = () => GET('/Borrow/getFloor')
//获取楼层下教室列表
export const getClassListApi = (data: string) => GET('/Borrow/getClassList', { floorName: data })
//获取课程信息
export const getCourseListApi = (data: IGetCourseList) => GET('/Borrow/getCourseList', data)
