<script lang="ts" setup>
// import { thatDayStart, thatDayEnd } from '@/utils'
import dayjs from 'dayjs'
import popup from '@/components/base/popup/index.vue'
import navbar from '@/components/base/navbar/index.vue'
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
	{ name: '补签中', value: 1 },
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
const startTime = ref('请选择')
const selectorStartTime = ({ detail }) => {
	startTime.value = detail.value
}
// 选择结束时间
const endTime = ref('请选择')
const selectorEndTime = ({ detail }) => {
	endTime.value = detail.value
}

//计算时间戳
const startTimestamp = computed(() => dayjs(startTime.value).valueOf())
const endTimestamp = computed(() => dayjs(endTime.value).valueOf())

// 查询签到列表
const sginList = ref<any[]>([])
const current = ref(0)
const page = ref(0)
const getAttendanceRecord = async () => {
	const parms = { startTime: startTimestamp.value, endTime: endTimestamp.value, size: 10, state: queryType.value, current: current.value }
	const res = await api.getAttendanceRecord(parms)
	if (res.statusCode === 200) {
		sginList.value = [...sginList.value, ...res.data.records]
		current.value = res.data.current
		page.value = res.data.pages
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

//筛选按钮
const popupRef = ref()
const filterPopupShow = ref(false)
const openFilterPopup = () => {
	filterPopupShow.value = true
}
const confirmPopup = () => {
	sginList.value.length = 0
	current.value = 0
	getAttendanceRecord()
	// 把滑动条拉回顶部 ... 微信设计师脑子里面装的都是浆糊
	Taro.createSelectorQuery()
		.select('.attendance-record')
		.node()
		.exec((res) => {
			const view = res[0].node
			view.scrollTo({ top: 0 })
		})
	popupRef.value.close()
}
const calculateState = (type: number) => attendanceRecordTypeList.find((item) => item.value === type)?.name
const onLower = () => {
	console.log('触底了')
	if (current.value + 1 > page.value) return
	current.value = current.value + 1
	getAttendanceRecord()
}

// 申请补签
const retroactiveShow = ref(false)
const retroactiveRef = ref()
const reason = ref('')
const retroactiveId = ref(0)
const openRetroactivePopup = (id: number) => {
	retroactiveShow.value = true
	retroactiveId.value = id
}
// 确定补签
const retroactiveConfirm = async () => {
	const res = await api.retroactive({ id: retroactiveId.value, signCause: reason.value })
	if (res.statusCode === 200) {
		Taro.showToast({ title: '申请成功', icon: 'success', duration: 2000 })
		sginList.value.forEach((item) => {
			if (item.id === retroactiveId.value) {
				item.state = 1
			}
		})
	} else {
		Taro.showToast({ title: '补签失败', icon: 'error', duration: 2000 })
	}
	retroactiveRef.value.close()
}
const retroactiveBeforeClose = () => {
	reason.value = ''
}
</script>

<template>
	<scroll-view class="attendance-record" :lowerThreshold="50" @scrolltolower="onLower" :scroll-y="true" :enhanced="true">
		<navbar></navbar>
		<popup v-model="filterPopupShow" @confirm="confirmPopup" :height="60" ref="popupRef">
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
		<!-- 申请补签弹窗 -->
		<popup v-model="retroactiveShow" ref="retroactiveRef" @beforeClose="retroactiveBeforeClose" @confirm="retroactiveConfirm">
			<div>
				<div class="text-16px ml-10px mt-10px">申请理由:</div>
				<textarea
					v-model="reason"
					auto-height
					placeholder="请输入申请理由"
					class="border-1 border-gray100 rounded-md w-100% p-10px box-border focus-within-border-emerald mt-10px"
				></textarea>
			</div>
		</popup>
		<div class="w-95% m-auto mt-10px h-auto pb-15px bg-white rounded-2xl box-border overflow-hidden shadow" v-for="item in sginList">
			<div class="w-100% h-40px center  pl-10px bg-[var(--color-primary2)] box-border text-white">
				<div class="flex-1 center justify-start">{{ item.courseName }}</div>
				<div class="flex-1 center justify-end pr-10px">{{ dayjs(item.startTime).format('YYYY-MM-DD') }}</div>
			</div>
			<div class="pl-10px pt-10px text-26px">{{ dayjs(item.startTime).format('HH:mm') }} ~ {{ dayjs(item.endTime).format('HH:mm') }}</div>
			<div class="pl-10px pt-10px text-16px center justify-start">
				<div class="icon"><div class="i-ri-user-line"></div></div>
				<div>{{ item.teacherName }}</div>
				<div class="ml-20px icon"><div class="i-ri-calendar-line"></div></div>
				<div>{{ calculateState(item.state) }}</div>
			</div>
			<div class="center mt-10px">
				<div v-if="item.state == 9" class=" btn-info w-90% center" @click="openRetroactivePopup(item.id)">申请补签</div>
			</div>
		</div>
		<div class="button3" @click="openFilterPopup"><div class="i-ri-filter-line"></div></div>
	</scroll-view>
</template>
<style lang="scss">
.attendance-record {
	box-sizing: border-box;
	padding-bottom: 30px;
	height: 100vh;
	width: 100%;
}
.button3 {
	@include center;
	position: fixed;
	border-radius: 10px;
	width: 120px;
	height: 120px;
	color: white;
	bottom: 100px;
	right: 50px;
	border-radius: 100%;
	background-color: var(--color-primary2);
	box-shadow: 0 20px 40px var(--color-shadow2);
	font-size: 32px;
}
.icon {
	width: 55px;
	height: 55px;
	min-width: 55px;
	margin-right: 20px;
	border-radius: 10px;
	@include center;
	background-color: var(--color-shadow2);
	color: var(--color-primary2);
	z-index: 0;
}
</style>
