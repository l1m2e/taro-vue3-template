<script lang="ts" setup>
import dayjs from 'dayjs'
import { useCheckSchoolBind, useToken } from '@/composables'
import empty from '@/components/empty-page/index.vue'
import courseCard from './components/course-card.vue'
import { addReactive } from '@/utils/setReactive'

let longLoopTimeIndex: number // 长轮询定时器索引
Taro.useDidShow(() => {
	useToken.value ? getCourseist() : ''
	useCheckSchoolBind() //检查是否绑定了学校如果没有绑定则跳转到绑定的页面
	startLongLoopTime() //进入页面启动长轮询定时器 计算当前上课时间 得出状态
})

Taro.useDidHide(() => {
	clearTimeout(longLoopTimeIndex) //离开页面终止定时器
})

//请求课程列表
const courseList = ref<any[]>([])
let leadTime = 0
const getCourseist = async () => {
	try {
		Taro.showLoading({ title: '加载中' })
		const res = await api.getClassLiveList(dayjs().valueOf())
		if (res.statusCode === 200) {
			courseList.value = res.data.list
			leadTime = res.data.atime * 1000
			computeTime()
			courseList.value.forEach((item) => {
				if (item.nowMAC) {
					getRefreshData(item, 'now')
				}
			})
			Taro.hideLoading()
		} else {
			Taro.hideLoading()
			if (res.data.message.indexOf('no class') !== -1) return // 没有数据
			Taro.showToast({ title: '数据更新失败', icon: 'error' })
		}
	} catch (error) {
		courseList.value.length = 0 // 请求失败清空缓存
		Taro.hideLoading()
		Taro.showToast({ title: '未知错误', icon: 'error' })
	}
}
defineExpose({ getCourseist })
//上课时间 轮询定时器
const startLongLoopTime = () => {
	const index = setInterval(() => {
		computeTime()
	}, 1000)
	longLoopTimeIndex = index
}

//计算当前上课状态
const today = dayjs().format('YYYY-MM-DD')
function computeTime() {
	courseList.value.forEach((item: any) => {
		item.state = computeType(item)
	})
	const res = courseList.value.find((item) => item.state === '待进行')
	if (res && res.haveClass === 'FE') {
		if (!refreshDataTimeIndex) {
			startRefreshDataTime(res)
		}
	} else {
		stopRefreshDataTime()
	}
}

// 计算卡片类型
const computeType = ({ beginTime, endTime }) => {
	const startTimestamp = dayjs(`${today} ${beginTime.slice(0, 5)}`).valueOf()
	const endTimestamp = dayjs(`${today} ${endTime.slice(0, 5)}`).valueOf()
	const nowTimestamp = dayjs().valueOf()
	if (nowTimestamp <= startTimestamp && nowTimestamp >= startTimestamp - leadTime) return '待进行'
	if (nowTimestamp <= startTimestamp) return '未上课'
	if (nowTimestamp >= startTimestamp && nowTimestamp <= endTimestamp) return '在进行'
	if (nowTimestamp >= endTimestamp) return '已结束'
}

//刷新数据定时器
let refreshDataTimeIndex: number | false = false
const startRefreshDataTime = (item: any) => {
	const index = setInterval(() => {
		if (item.nowMAC) {
			getRefreshData(item, 'now')
		} else {
			getRefreshData(item, 'old')
		}
	}, 5000)
	refreshDataTimeIndex = index
}
//停止刷新数据定时器
const stopRefreshDataTime = () => {
	if (refreshDataTimeIndex) {
		clearTimeout(refreshDataTimeIndex)
		refreshDataTimeIndex = false
	}
}
// 请求刷新数据
const getRefreshData = async (item: any, action: string) => {
	const flag = ['now'].includes(action)
	const res = await api.getNewClassLive({ classRoomMac: flag ? item.nowMAC : item.classDeviceMac, id: item.sid, action })
	if (res.statusCode === 200) {
		item.haveClass = res.data.havingClass
		addReactive(item, res.data)
		console.log(item)
	}
}
</script>

<template>
	<div class="course  box-border">
		<empty v-if="!useToken" type="noLogin"></empty>
		<div v-else>
			<div v-if="courseList.length" class="pb-100px">
				<course-card v-for="item in courseList" :state="item.state" :data="item"></course-card>
			</div>
			<empty v-else></empty>
		</div>
	</div>
</template>

<style lang="scss"></style>
