// 封装Taro 获取 wifi 信息 false 为获取失败 不为false 则返回 wifi 信息
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

// promis 形式

// try {
// 	await Taro.startWifi()
// type v = Extract<Parameters<typeof Taro.getConnectedWifi>[0], {}>
// 	const wifiInfo = ((await Taro.getConnectedWifi()) as unknown) as Parameters<Extract<v['success'], {}>>[0]
// 	return wifiInfo
// } catch (error) {
// 	return false
// }
