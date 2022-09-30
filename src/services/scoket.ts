import Taro from '@tarojs/taro'
const isDev = process.env.NODE_ENV !== 'production'
const host = isDev ? '192.168.88.123:8080' : '192.168.88.108:8080'

export class ws {
	url: string
	isOpen: boolean = false
	constructor(url: string) {
		this.url = url
		this.create()
		// this.open()
	}
	create() {
		Taro.connectSocket({
			url: `ws://${host}${this.url}`
		})
	}
	open() {
		Taro.onSocketOpen(() => {
			console.log('已链接')
			this.isOpen = true
		})
	}
	send(msg: any) {
		Taro.onSocketOpen(() => {
			Taro.sendSocketMessage({
				data: msg
			})
		})
	}
	onMessage(fn: Taro.onSocketMessage.Callback<any>) {
		Taro.onSocketMessage(fn)
	}
	onError(fn: Taro.onSocketError.Callback) {
		Taro.onSocketError(fn)
	}
	onClose(fn: Taro.onSocketClose.Callback) {
		Taro.onSocketClose(fn)
	}
}
