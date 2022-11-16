import { baseUrl } from '@/config/baseUrl'
export const noNetworkSvg = computed(() => `${baseUrl.value}/applet/image/noNetwork.svg`) // 没有网络
export const errorSvg = computed(() => `${baseUrl.value}/applet/image/error.svg`) // 错误
export const noDataSvg = computed(() => `${baseUrl.value}/applet/image/noData.svg`) // 没有数据
export const noCourseSvg = computed(() => `${baseUrl.value}/applet/image/noCourse.svg`) // 没有课程
export const signInSvg = computed(() => `${baseUrl.value}/applet/image/sign-in.svg`) // 签到
export const logoSvg = computed(() => `${baseUrl.value}/applet/image/logo.svg`) // 小程序图标
