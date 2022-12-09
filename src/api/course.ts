import { GET } from '@/services'
import type { IweekCourse } from './types'

export const getWeekCourseApi = (data: IweekCourse) => GET('/course/weekCourse', data)
export const getformatWeekApi = (data: IweekCourse) => GET('/course/weekCourseSimplify', data)
export const getCourseTime = () => GET('/course/timeCourse')