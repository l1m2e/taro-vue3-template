<script lang="ts" setup>
import dayjs from 'dayjs'
import { thatDayStart, thatDayEnd } from '@/utils'
definePageConfig({
	navigationBarTitleText: '考勤记录',
	navigationBarBackgroundColor: '#fafafa',
	enablePullDownRefresh: true,
	backgroundTextStyle: 'dark',
	backgroundColor: '#fafafa'
})

//下拉刷新
Taro.usePullDownRefresh(() => {
	Taro.startPullDownRefresh()
	Taro.stopPullDownRefresh()
})
const nowTypeText = computed(() => attendanceRecordTypeList.find((item) => item.value === queryType.value)?.name)
// 考勤记录类型
const attendanceRecordTypeList = [
	{ name: '全部', value: '' },
	{ name: '签到成功', value: 0 },
	{ name: '申请补签', value: 1 },
	{ name: '补签通过', value: 2 },
	{ name: '补签失败', value: 3 },
	{ name: '缺勤', value: 9 }
]
const queryType = ref<string | number>('')
//选择类型
const selectorType = ({ detail }) => {
	queryType.value = attendanceRecordTypeList[parseInt(detail.value)].value
	console.log('queryType.value', queryType.value)
}
//查询时间
const startTimestamp = thatDayStart()
const endTimestamp = thatDayEnd()
console.log(startTimestamp, endTimestamp)

// 查询签到列表
const getAttendanceRecord = async () => {
	const res = await api.getAttendanceRecord({})
}
const queryModel = ref<boolean>(true)
// 查询当周信息
const getWeekInfo = async () => {
	const res = await api.getCourseTime()
	console.log(res)
}
getWeekInfo()
</script>

<template>
	<div calss="attendance-record">
		<div class="fixed top-0 w-100vw h-60px box-border p-10px bg-white flex">
			<div class="flex-1 center  justify-start">
				<picker mode="selector" :range="attendanceRecordTypeList" rangeKey="name" @change="selectorType">
					<div class="button3">{{ nowTypeText }}</div>
				</picker>
				<picker class="button4" mode="date"><div class="button4">time</div></picker>
			</div>
			<div :class="queryModel ? 'button' : 'button2'" @click="queryModel = !queryModel">
				<div class="center" v-if="queryModel">
					<div class="mr-5px">日</div>
					<div class="i-ri-arrow-left-right-line"></div>
				</div>
				<div class="center" v-else>
					<div class="mr-5px">周</div>
					<div class="i-ri-arrow-left-right-line"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.button {
	@include center;
	color: white;
	max-width: 120px;
	margin-left: px;
	height: 80px;
	background-color: var(--color-primary2);
	flex: 1;
	border-radius: 19px;
	box-shadow: 0 20px 40px var(--color-shadow2);
}
.button2 {
	@extend .button;
	background-color: var(--color-primary1);
	box-shadow: 0 20px 40px var(--color-shadow1);
}
.button3 {
	@include center;
	border-radius: 10px;
	width: 200px;
	height: 80px;
	color: white;
	background-color: var(--color-primary3);
	box-shadow: 0 20px 40px var(--color-shadow3);
}
.button4 {
	@include center;
	margin-left: 20px;
	border-radius: 10px;
	width: 300px;
	height: 80px;
	color: white;
	background-color: var(--color-primary4);
	box-shadow: 0 20px 40px var(--color-shadow4);
}
</style>
