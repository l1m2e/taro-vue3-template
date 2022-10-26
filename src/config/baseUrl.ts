const isDev = process.env.NODE_ENV !== 'production'
import { useSchoolInfo } from '@/composables/useSchools'

const resUrl = () => {
	if (isDev) {
		// 开发模式 固定 url
		return 'http://192.168.88.123:8080'
	} else {
		// 部署模式 url 由用户选择
		return useSchoolInfo.value.innerURL
	}
}

export const baseUrl = resUrl()
