const isDev = process.env.NODE_ENV !== 'production'
import { useProductionHttpUrl, useProductionSocketUrl } from '@/composables/useSchools'

const httpUrl = ref('http://192.168.88.123:8081')
const webSocketUrl = ref('http://192.168.88.123:8998')

export const baseUrl = isDev ? httpUrl : useProductionHttpUrl

export const socketUrl = isDev ? webSocketUrl : useProductionSocketUrl
