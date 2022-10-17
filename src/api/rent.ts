import { GET, POST } from '@/services'
import type { IGetCourseList, IAddRentClassroom,IRentList } from './types'
//获取所有楼层
export const getFloorApi = () => GET('/Borrow/getFloor')
//获取楼层下教室列表
export const getClassListApi = (data: string) => GET('/Borrow/getClassList', { floorName: data })
//获取课程信息
export const getCourseListApi = (data: IGetCourseList) => GET('/Borrow/getCourseList', data)
//添加一个借用
export const addRentClassroomApi = (data: IAddRentClassroom) => POST('/Borrow/addBorrow', data)
//查询借用列表
export const getRentListApi = (data:IRentList) => GET('/Borrow/queryBorrowList',data)