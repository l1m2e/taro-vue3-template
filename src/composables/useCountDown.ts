// 传入结束时间戳 生成倒计时 返回剩余时间戳
import dayjs from 'dayjs'
export const useCountDown = (endTime: number) => {
	interface IState {
		count: number
		timer: null | ReturnType<typeof setInterval>
	}
	let state = reactive<IState>({
		count: endTime - dayjs().valueOf(),
		timer: null
	})
	//开始倒计时
	clear()
	state.timer = setInterval(() => {
		let now = dayjs().valueOf()
		state.count = endTime - now
		if (state.count <= 0) {
			state.count = 0
			clear()
		}
		console.log('[ state.count ] >', state.count)
	}, 1000)
	//清除倒计时
	function clear() {
		if (state.timer) {
			clearInterval(state.timer)
		}
	}
	//离开页面清除计时器
	Taro.useUnload(() => {
		clear()
	})
	return state
}
