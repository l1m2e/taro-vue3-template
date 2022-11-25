import { useStorage } from './useStorage'
import { setReactive } from '@/utils/setReactive'
// import { useLogout } from './useUser'
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
export const useProductionHttpUrl = computed(() =>
	useSchoolInfo.value.outURL.split(',')[0] ? useSchoolInfo.value.outURL.split(',')[0] : useSchoolInfo.value.innerURL.split(',')[0]
)
// 导出 webSocket baseUrl 优先外网
export const useProductionSocketUrl = computed(() =>
	useSchoolInfo.value.outURL.split(',')[1] ? useSchoolInfo.value.outURL.split(',')[1] : useSchoolInfo.value.innerURL.split(',')[1]
)

//绑定学校的状态
export const useSchoolState = computed(() => useSchoolInfo.value.innerURL !== '')
export const useCheckSchoolBind = () => {
	if (!useSchoolState.value) {
		Taro.navigateTo({ url: '/pages/user/components/bindSchool' })
	}
}

//确定绑定学校
export const useConfirmSchool = (data: ISchoolInfo) => {
	if (data.innerURL) {
		if (!data.innerURL.replace(',', '')) {
			data.innerURL = ''
		}
	}
	if (data.outURL) {
		if (!data.outURL.replace(',', '')) {
			data.outURL = ''
		}
	}
	if (data.innerURL) {
		setReactive(useSchoolInfo.value, data)
		console.log('useProductionHttpUrl', useProductionHttpUrl)
		Taro.showToast({ title: `绑定成功`, icon: 'success', duration: 2000 })
		Taro.switchTab({ url: '/pages/user/index' })
	} else {
		Taro.showToast({ title: `学校未配置`, icon: 'error', duration: 2000 })
	}
}
