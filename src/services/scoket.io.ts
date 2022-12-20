import { socketUrl } from '@/config/baseUrl'
import { useToken, useUserInfo } from '@/composables'
const ws = require('weapp.socket.io')

//签到
export const signInIO = () => ws(`${socketUrl.value}/CInteractStu`, { query: { token: useToken.value, studentId: useUserInfo.value.studentId }, transports: ['websocket'] })
