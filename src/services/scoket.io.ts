import { io } from 'weapp.socket.io'
import { baseUrl } from '@/config/baseUrl'
import { useToken } from '@/composables'

export const socket = io(baseUrl, {
	reconnectionDelayMax: 10000,
	auth: {
		token: useToken
	},
	query: {
		'my-key': 'my-value'
	}
})
