import { socketUrl } from '@/config/baseUrl'
import { useToken, useUserInfo } from '@/composables'
const ws = require('weapp.socket.io')

//签到
export const signInIO = () => ws(`${socketUrl}/CInteractStu`, { query: { token: useToken.value, userId: useUserInfo.value.studentId }, transports: ['websocket'] })
