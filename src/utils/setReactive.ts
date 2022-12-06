export const setReactive = (reactiveData: any, setData: any) => {
	Object.keys(reactiveData).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(setData, key)) {
			reactiveData[key] = setData[key]
		}
	})
}

export const addReactive = (reactiveData: any, addData: any) => {
	Object.keys(addData).forEach((key) => {
		reactiveData[key] = addData[key]
	})
}
