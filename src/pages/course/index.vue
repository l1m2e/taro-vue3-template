<script lang="ts" setup>
import dayjs from 'dayjs'
import { useCheckSchoolBind, useToken } from '@/composables'
import empty from '@/components/empty-page/index.vue'
import courseCard from './components/course-card.vue'
definePageConfig({
	navigationBarTitleText: '课程',
	navigationBarBackgroundColor: '#fafafa'
})

Taro.useDidShow(() => {
	if (useToken.value) {
		courseList.value.length = 0 //进入页面清空缓存的数据
		getCourseist()
	}
	useCheckSchoolBind() //检查是否绑定了学校如果没有绑定则跳转到绑定的页面
})

const courseList = ref<any[]>([])
const getCourseist = async () => {
	const res = await api.getClassLiveList(+dayjs())
	if (res.statusCode === 200) {
		courseList.value = res.data
		computeTime()
	}
}

//进入页面启动定时器
const loopComputeTime = setInterval(() => {
	computeTime()
}, 1000)
//离开页面终止定时器
Taro.useUnload(() => {
	clearTimeout(loopComputeTime)
})

const today = dayjs().format('YYYY-MM-DD')
function computeTime() {
	courseList.value.forEach((item: any) => {
		let startTime = +dayjs(`${today} ${item.beginTime.slice(0, 5)}`)
		let endTime = +dayjs(`${today} ${item.endTime.slice(0, 5)}`)
		if (+dayjs() > endTime) {
			item.state = '已结束'
		} else {
			if (+dayjs() >= startTime) {
				item.state = '在进行'
			} else {
				item.state = '未上课'
			}
		}
	})
}
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
