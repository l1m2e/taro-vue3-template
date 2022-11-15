const isDev = process.env.NODE_ENV !== 'production'
import { useProductionHttpUrl, useProductionSocketUrl } from '@/composables/useSchools'

const devUrl = 'http://192.168.88.123' //开发模式url
const httpPort = ':8081'
const socketPort = ':8998'

const resUrl = () => {
	return isDev ? devUrl + httpPort : useProductionHttpUrl.value
}
const resSocketUrl = () => {
	return isDev ? devUrl + socketPort : useProductionSocketUrl.value
}

export const baseUrl = resUrl()
export const socketUrl = resSocketUrl()
