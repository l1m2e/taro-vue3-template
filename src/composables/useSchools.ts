import { useStorage } from './useStorage'
import { setReactive } from '@/utils/setReactive'
import { useLogout } from './useUser'
interface ISchoolInfo {
	innerURL: string
	mac: string
	outURL: string
	sid: string
	school_Name: string
}

export const useSchoolInfo = useStorage('schoolInfo', {
	sid: '',
	innerURL: '',
	school_Name: '',
	outURL: ''
})

// 导出http baseUrl 优先外网
export const useProductionHttpUrl = computed(() => {
	if (useSchoolInfo.value.outURL && useSchoolInfo.value.innerURL) {
		return useSchoolInfo.value.outURL.split(',')[0] ? useSchoolInfo.value.outURL.split(',')[0] : useSchoolInfo.value.innerURL.split(',')[0]
	}
	return null
})

// 导出 webSocket baseUrl 优先外网
export const useProductionSocketUrl = computed(() => {
	if (useSchoolInfo.value.outURL && useSchoolInfo.value.innerURL) {
		return useSchoolInfo.value.outURL.split(',')[1] ? useSchoolInfo.value.outURL.split(',')[0] : useSchoolInfo.value.innerURL.split(',')[1]
	}
	return null
})

//绑定学校的状态
export const useSchoolState = computed(() => useSchoolInfo.value.innerURL !== '')
export const useCheckSchoolBind = () => {
	if (!useSchoolState.value) {
		Taro.navigateTo({ url: '/pages/user/components/bindSchool' })
	}
}

//确定绑定学校
export const useConfirmSchool = (data: ISchoolInfo) => {
	if (data.innerURL && data.outURL) {
		useLogout() // 清除登录状态
		setReactive(useSchoolInfo.value, data)
		Taro.showToast({ title: `绑定成功`, icon: 'success', duration: 2000 })
		Taro.switchTab({ url: '/pages/user/index' })
	} else {
		Taro.showToast({ title: `学校未配置`, icon: 'error', duration: 2000 })
	}
}
