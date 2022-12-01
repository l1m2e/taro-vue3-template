import { useProductionHttpUrl, useProductionSocketUrl } from '@/composables'

//公司开发环境
// const httpUrl = ref('http://192.168.88.123:8081')
// const webSocketUrl = ref('http://192.168.88.123:8998')

//居家办公环境
const httpUrl = ref('http://192.168.5.168:8080')
const webSocketUrl = ref('http://192.168.5.168:8999')

//线上环境
const isDev = process.env.NODE_ENV !== 'production'
export const baseUrl = isDev ? httpUrl : useProductionHttpUrl
export const socketUrl = isDev ? webSocketUrl : useProductionSocketUrl
