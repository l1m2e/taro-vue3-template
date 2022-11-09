export const useWifi = async () => {
	try {
		await Taro.startWifi()
		type a = Extract<Parameters<typeof Taro.getConnectedWifi>[0], {}>
		const wifiInfo = ((await Taro.getConnectedWifi()) as unknown) as Parameters<Extract<a['success'], {}>>[0]
		return wifiInfo
	} catch (error) {
		return false
	}
}
