//
/**
 * 封装Taro 获取 wifi 信息
 * @returns  false 为获取失败 不为false 则返回 wifi 信息
 */
export const useWifi = () => {
	type v = Extract<Parameters<typeof Taro.getConnectedWifi>[0], {}>
	let wifiInfo = ref<Parameters<Extract<v['success'], {}>>[0] | false>(false)
	Taro.startWifi({
		success() {
			Taro.getConnectedWifi({
				success(res) {
					wifiInfo.value = res
				},
				fail() {
					wifiInfo.value = false
				}
			})
		},
		fail() {
			wifiInfo.value = false
		}
	})
	return wifiInfo
}
