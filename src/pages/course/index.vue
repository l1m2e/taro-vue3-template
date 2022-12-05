<script lang="ts" setup>
import dayjs from 'dayjs'
import { useCheckSchoolBind, useToken } from '@/composables'
import empty from '@/components/empty-page/index.vue'
import courseCard from './components/course-card.vue'

definePageConfig({
	navigationBarTitleText: '课程',
	navigationBarBackgroundColor: '#fafafa',
	enablePullDownRefresh: true,
	backgroundTextStyle: 'dark',
	backgroundColor: '#fafafa'
})

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
			const flag = courseList.value.find((item) => item.state === '待进行')
			if (flag) {
				getRefreshData()
			}
			Taro.hideLoading()
		} else {
			Taro.hideLoading()
			Taro.showToast({ title: '数据更新失败', icon: 'error' })
		}
	} catch (error) {
		courseList.value.length = 0 // 请求失败清空缓存
		Taro.hideLoading()
		Taro.showToast({ title: '未知错误', icon: 'error' })
	}
}

//上课时间 轮询定时器
const startLongLoopTime = () => {
	const index = setInterval(() => {
		computeTime()
	}, 1000)
	longLoopTimeIndex = index
}

//计算当前上课状态
const today = dayjs().format('YYYY-MM-DD')
let classMac = ''
let courseIndex = ''
function computeTime() {
	courseList.value.forEach((item: any) => {
		item.state = computeType(item)
		if (item.state === '待进行') {
			classMac = item.classDeviceMac
			courseIndex = item.sid
		}
	})
	const res = courseList.value.find((item) => item.state === '待进行')
	if (res && res.haveClass === 'FE') {
		if (!refreshDataTimeIndex) {
			startRefreshDataTime()
		}
	} else {
		stopRefreshDataTime()
	}
}
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
const startRefreshDataTime = () => {
	const index = setInterval(() => {
		getRefreshData()
	}, 30000)
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
const getRefreshData = async () => {
	const res = await api.getNewClassLive({ classRoomMac: classMac, id: courseIndex })
	if (res.statusCode === 200) {
		courseList.value.forEach((item) => {
			if (item.sid === courseIndex) {
				item.haveClass = res.data.havingClass
				item.newMac = res.data.newMac
				item.newName = res.data.newName
				item.newPos = res.data.newPos
				if (res.data.list) {
					item.list = res.data.list
				}
			}
		})
	}
}

//下拉刷新
Taro.usePullDownRefresh(() => {
	Taro.startPullDownRefresh()
	getCourseist()
	Taro.stopPullDownRefresh()
})
</script>

<template>
	<div class="course pb-50px box-border">
		<empty v-if="!useToken" type="noLogin"></empty>
		<div v-else>
			<div v-if="courseList.length">
				<course-card v-for="item in courseList" :state="item.state" :data="item"></course-card>
			</div>
			<empty v-else></empty>
		</div>
	</div>
</template>

<style lang="scss"></style>
