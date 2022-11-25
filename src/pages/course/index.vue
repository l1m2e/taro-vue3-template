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
			Taro.hideLoading()
			Taro.showToast({ title: '数据已更新' })
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

//长轮询定时器
const startLongLoopTime = () => {
	const index = setInterval(() => {
		computeTime()
		console.log('循环当前定时器')
	}, 1000)
	longLoopTimeIndex = index
}

//计算当前上课状态
const today = dayjs().format('YYYY-MM-DD')
function computeTime() {
	courseList.value.forEach((item: any) => {
		const startTime = +dayjs(`${today} ${item.beginTime.slice(0, 5)}`)
		const endTime = +dayjs(`${today} ${item.endTime.slice(0, 5)}`)
		if (dayjs().valueOf() > endTime) {
			item.state = '已结束'
		} else {
			if (dayjs().valueOf() >= startTime) {
				item.state = '在进行'
			} else {
				item.state = '未上课'
			}
		}
	})
}

//下拉刷新
Taro.usePullDownRefresh(() => {
	Taro.startPullDownRefresh()
	getCourseist()
	Taro.stopPullDownRefresh()
})
</script>

<template>
	<div class="course">
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
