<script lang="ts" setup>
// import { thatDayStart, thatDayEnd } from '@/utils'
import dayjs from 'dayjs'
import popup from '@/components/base/popup/index.vue'
definePageConfig({
	navigationBarTitleText: '考勤记录',
	navigationBarBackgroundColor: '#fafafa',
	enablePullDownRefresh: true,
	backgroundTextStyle: 'dark',
	backgroundColor: '#fafafa',
	navigationStyle: 'custom'
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
// 选择开始时间
const startTime = ref('')
const selectorStartTime = ({ detail }) => {
	startTime.value = detail.value
}
// 选择结束时间
const endTime = ref('')
const selectorEndTime = ({ detail }) => {
	endTime.value = detail.value
}

//计算时间戳
const startTimestamp = computed(() => dayjs(startTime.value).valueOf())
const endTimestamp = computed(() => dayjs(endTime.value).valueOf())

// 查询签到列表
const sginList = ref([])
const getAttendanceRecord = async () => {
	const res = await api.getAttendanceRecord({ startTime: startTimestamp.value, endTime: endTimestamp.value })
	if (res.statusCode === 200) {
		sginList.value = res.data
	}
}
// const queryModel = ref<boolean>(true)
// 查询当周信息
const getWeekInfo = async () => {
	const res = await api.getCourseTime()
	if (res.statusCode === 200) {
		startTime.value = res.data.startDate
		endTime.value = res.data.endDate
	}
	getAttendanceRecord()
}
getWeekInfo()

const flag = ref(false)
const fn = () => {
	flag.value = !flag.value
}
const confirmPopup = () => {
	flag.value = false
}
</script>

<template>
	<div calss="attendance-record">
		<popup v-model="flag" @confirm="confirmPopup" :height="60">
			<div>
				<div class="cell">
					<div>类型</div>
					<picker mode="selector" :range="attendanceRecordTypeList" rangeKey="name" @change="selectorType">
						<div class="w-150px  h-100% center relative ">
							<div>{{ nowTypeText }}</div>
							<div class="i-ri-arrow-right-s-line absolute right-10px"></div>
						</div>
					</picker>
				</div>
				<div class="cell">
					<div>开始时间</div>
					<picker mode="date" @change="selectorStartTime">
						<div class="w-150px h-100% center relative ">
							<div>{{ startTime }}</div>
							<div class="i-ri-arrow-right-s-line absolute right-10px"></div>
						</div>
					</picker>
				</div>
				<div class="cell">
					<div>结束时间</div>
					<picker mode="date" @change="selectorEndTime">
						<div class="w-150px h-100% center relative ">
							<div>{{ endTime }}</div>
							<div class="i-ri-arrow-right-s-line absolute right-10px"></div>
						</div>
					</picker>
				</div>
			</div>
		</popup>

		<!-- <div class="fixed top-0 w-100vw h-60px box-border p-10px bg-white flex">
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
		</div> -->
		<div class="button3" @click="fn">aa</div>
	</div>
</template>
<style lang="scss">
.button {
	@include center;
	color: white;
	max-width: 120px;
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
