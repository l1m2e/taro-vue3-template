import { useStorage } from './useStorage'

interface ISchoolInfo {
	sid: string
	innerURL: string
	School_Name: string
}

export const useSchoolInfo = useStorage<ISchoolInfo>('schoolInfo', {
	sid: '',
	innerURL: '',
	School_Name: ''
})

export const useConfirmSchool = (data: ISchoolInfo) => {
	useSchoolInfo.value = data
	if (useSchoolInfo.value.innerURL !== '') {
		Taro.showToast({
			title: `绑定成功`,
			icon: 'success',
			duration: 2000
		})
		Taro.switchTab({
			url: '/pages/home/index'
		})
	} else {
		Taro.showToast({
			title: `绑定失败,学校可能未分配请联系管理员`,
			icon: 'error',
			duration: 2000
		})
	}
}
