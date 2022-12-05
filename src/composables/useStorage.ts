//生成反应式本地缓存
export function useStorage<T>(key: string, data: T) {
	const reactiveData = ref<T>(data)

	if (Taro.getStorageSync(key)) {
		reactiveData.value = JSON.parse(Taro.getStorageSync(key))
	}

	watch(
		() => reactiveData.value,
		(v) => {
			Taro.setStorageSync(key, JSON.stringify(v))
		},
		{ deep: true }
	)

	return reactiveData
}
