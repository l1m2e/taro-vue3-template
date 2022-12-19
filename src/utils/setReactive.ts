/**
 * 拷贝对象 如果两个对象的key相等将被拷贝对象的key的值赋予原始对象
 * @param reactiveData 原始对象
 * @param setData 被拷贝对象
 */
export const setReactive = (reactiveData: any, setData: any) => {
	Object.keys(reactiveData).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(setData, key)) {
			reactiveData[key] = setData[key]
		}
	})
}

/**
 * 批量给对象添加属性
 * @param reactiveData 原始对象
 * @param addData 被添加的对象
 * @param include 选择添加的key的数组
 */
export const addReactive = (reactiveData: any, addData: any, include?: Array<string>) => {
	Object.keys(addData).forEach((key) => {
		if (include && include.includes(key)) {
			reactiveData[key] = addData[key]
		} else if (!include) {
			reactiveData[key] = addData[key]
		}
	})
}
