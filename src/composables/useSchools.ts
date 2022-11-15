import { useStorage } from './useStorage'
import { setReactive } from '@/utils/setReactive'
interface ISchoolInfo {
	aid: string
	appid: string
	connectTime: string
	createTime: string
	index: number
	innerURL: string
	mac: string
	onLineStatus: string
	outURL: string
	school_City: string
	school_County: string
	school_IP: string
	school_Name: string
	school_Provinces: string
	school_Type: string
	school_port: string
	sid: number
	thisLoginTime: string
	urlType: string
	version: string
}

export const useSchoolInfo = useStorage('schoolInfo', {
	sid: '',
	innerURL: '',
	School_Name: '',
	outURL: ''
})

// 导出http Url 优先外网
export const useProductionHttpUrl = computed(() =>
	useSchoolInfo.value.outURL.split(',')[0] ? useSchoolInfo.value.outURL.split(',')[0] : useSchoolInfo.value.innerURL.split(',')[0]
)
// 导出 webSocketUrl 优先外网
export const useProductionSocketUrl = computed(() =>
	useSchoolInfo.value.outURL.split(',')[1] ? useSchoolInfo.value.outURL.split(',')[0] : useSchoolInfo.value.innerURL.split(',')[1]
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
	setReactive(useSchoolInfo.value, data)
	console.log('[ useSchoolInfo.value.outURL.split(', ')[0] ] >', useSchoolInfo.value.outURL.split(',')[0])
	if (useSchoolInfo.value.innerURL !== '') {
		Taro.showToast({
			title: `绑定成功`,
			icon: 'success',
			duration: 2000
		})
		Taro.switchTab({
			url: '/pages/live/index'
		})
	} else {
		Taro.showToast({
			title: `绑定失败,学校可能未分配请联系管理员`,
			icon: 'error',
			duration: 2000
		})
	}
}
