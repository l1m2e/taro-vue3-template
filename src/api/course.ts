import { GET } from '@/services'
import { IweekCourse } from './types'

export const getWeekCourseApi = (data: IweekCourse) => GET('/course/weekCourse', data)