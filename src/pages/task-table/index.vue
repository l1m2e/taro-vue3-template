<script lang="ts" setup>
import dayjs from 'dayjs'
import todaySelect from '@/components/select-day/index.vue'
import steps from './components/steps.vue'
import { changeTextToCN } from '@/utils/changeTextToCN'
import getNowWeek from '@/utils/getNowWeek'
import Mask from '@/components/mask/index.vue'
import { useToken } from '@/composables'
import empty from '@/components/empty-page/index.vue'

definePageConfig({
	navigationBarTitleText: '课程表',
	navigationBarBackgroundColor: '#fafafa',
	usingComponents: {}
})

let timeIndex = 0
Taro.useDidShow(() => {
	if (useToken.value) {
		getWeekCourse()
		getFormatWeek()
		timeIndex = createTimeOut()
	}
})
//离开清空定时器
Taro.useDidHide(() => {
	clearInterval(timeIndex)
})

//遮罩
const maskShow = ref(true)
//日视图
const swiperChange = (e: any) => {
	num.value = e.detail.current
}

const getIndex = (e: number) => {
	num.value = e
}
const num = ref(dayjs().day() === 0 ? 6 : dayjs().day() - 1)
const month = dayjs().format('YYYY-MM')
const weekList: any = ref([])
const week = ref()
const getWeekCourse = async () => {
	const param = {
		time: dayjs().format('YYYY-MM-DD'),
		interfaceNum: '45-2',
		parameter: '班级名称1'
	}
	const { data: res } = await api.getWeekCourseApi(param)
	weekList.value = res.weekCourse
	week.value = changeTextToCN(res.weekNum)
	setWeekCourse()
	maskShow.value = false
}

const setWeekCourse = () => {
	weekList.value.forEach((item: any) => {
		item.forEach((e: any) => {
			e.activate = calculateType(e)
		})
	})
}

const calculateType = ({ endTime, startTime }) => {
	let now: number = dayjs().valueOf()
	if (now < endTime && now > startTime) return 'ongoing'
	if (now < endTime && now < startTime) return 'unfinished'
	if (now > endTime) return 'completed'
}

// 创建定时器
const createTimeOut = () => {
	return setInterval(() => {
		setWeekCourse()
	}, 1000)
}

const date = ref(dayjs().format('YYYY-MM-DD'))
const viewSwitch = ref(true)
const weekDateArr = getNowWeek(date.value)
//周视图
const colorArr = [
	{ backgroundColor: '#49B5835D', textColor: '#02AA5C' },
	{ backgroundColor: '#ff41715D', textColor: '#F81F55' },
	{ backgroundColor: '#0293C85D', textColor: '#0293C8' },
	{ backgroundColor: '#ffbd695D', textColor: '#F79514' },
	{ backgroundColor: '#2c68ff5D', textColor: '#0C4EF5' }
]

const weekListFormat = ref<any>([])
const setColor = (data: any) => {
	let index = 0
	const obj = {}
	data.forEach((item: any) => {
		item.courseName.unshift('时间')
		item.courseName.forEach((name: string, i: number) => {
			if (!obj[name] && name) {
				obj[name] = colorArr[index]
				let temp = { name, textColor: colorArr[index].textColor, backgroundColor: colorArr[index].backgroundColor }
				item.courseName[i] = temp
				index++
				index = index >= colorArr.length ? 0 : index
			} else if (name) {
				let temp = { name, textColor: obj[name].textColor, backgroundColor: obj[name].backgroundColor }
				item.courseName[i] = temp
			}
		})
	})
}

const getFormatWeek = async () => {
	const param = {
		parameter: '班级名称1',
		time: dayjs().format('YYYY-MM-DD'),
		interfaceNum: '45-4'
	}
	const { data: res, statusCode } = await api.getformatWeekApi(param)
	if (statusCode === 200) {
		weekListFormat.value = res
		setColor(weekListFormat.value)
	}
}
</script>

<template>
	<div>
		<div class="task" v-if="useToken">
			<Mask :show="maskShow"></Mask>
			<div class="title">
				<div class="left">
					<span class="item1">{{ month }}</span>
					<span class="item2">{{ week }}周</span>
				</div>
				<div :class="viewSwitch ? 'right' : 'rightWeek'">
					<div @click="viewSwitch = !viewSwitch">
						<image :src="require('../../assets/icon/switch.svg')"></image>
						&nbsp;
						<span>{{ viewSwitch ? '周视图' : '日视图' }}</span>
					</div>
				</div>
			</div>
			<div v-show="viewSwitch">
				<todaySelect @index="getIndex" :swiperIndex="num"></todaySelect>
				<div class="task-today">
					<swiper :current="num" @change="swiperChange">
						<swiper-item class="swiper-item" v-for="item in weekList">
							<div class="content">
								<steps :data="day" :activate="day.activate" v-for="(day, i) in item" :end="i === item.length - 1 ? true : false"></steps>
							</div>
						</swiper-item>
					</swiper>
				</div>
			</div>
			<div class="week-view" v-show="!viewSwitch">
				<div class="week-title">
					<div class="week-title-item"></div>
					<div class="week-title-item" v-for="item in weekDateArr">
						<span class="week-title-text">{{ item.week }}</span>
						<span class="week-title-date">{{ dayjs(item.date).format('MM/DD') }}</span>
					</div>
				</div>
				<div class="week-box">
					<div class="week-body" v-for="(item, index) in weekListFormat">
						<div class="week-body-item" v-for="(v, i) in item.courseName">
							<div v-if="i === 0" class="week-body-index">
								<span>{{ index + 1 }}</span>
								<span>{{ item.startTime }}</span>
								<span>{{ item.endTime }}</span>
							</div>
							<div v-else class="week-body-course" :style="{ backgroundColor: v.backgroundColor, color: v.textColor }">{{ v.name }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<empty v-else type="noLogin"></empty>
	</div>
</template>

<style lang="scss">
page {
	background-color: #fafafa;
}

.task {
	.title {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 200px;
		padding: 0 40px;
		.left,
		.right {
			flex: 1;
		}
		.right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			div {
				width: 80%;
				height: 100px;
				color: white;
				border-radius: 30px;
				background-color: #49b583;
				box-shadow: 0 20px 40px #49b58351;
				@include center;
				image {
					width: 42px;
					height: 42px;
				}
				span {
					font-size: 32px;
				}
			}
		}
		.rightWeek {
			@extend .right;
			div {
				background-color: #7f86ff;
				box-shadow: 0 20px 40px #7f85ff51;
			}
		}
		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			.item1 {
				color: #7e7e7e;
			}
			.item2 {
				font-size: 45px;
			}
		}
	}

	.task-today {
		overflow: hidden;
		width: 700%;
		height: calc(100vh - 200px - 120px);
		swiper {
			height: 100%;
			.swiper-item {
				overflow-y: auto;
				.content {
					box-sizing: border-box;
					width: 100vw;
					padding: 40px;
					margin-bottom: 100px;
					.card {
						width: 600px;
						height: 200px;
						margin-bottom: 30px;
						border-radius: 25px;
						background-color: #7f86ff;
					}
				}
			}
		}
	}

	.week-view {
		width: 100%;
		height: 100%;
		.week-title {
			display: flex;
			.week-title-item {
				flex: 1;
				flex-direction: column;
				height: 50px;
				@include center;
				.week-title-text {
					font-size: 20px;
					color: #7e7e7e;
				}
				.week-title-date {
					font-size: 16px;
					color: #7e7e7e;
				}
			}
			.week-title-item:nth-child(1) {
				max-width: 55px;
			}
		}

		.week-box {
			overflow: hidden;
			overflow-y: scroll;
			width: 100%;
			height: calc(100vh - 250px);
			.week-body {
				display: flex;
				.week-body-item {
					flex: 1;
					height: 150px;
					border-top: 1px solid #ebebeb;
					border-left: 1px solid #ebebeb;
					@include center;
					.week-body-index {
						flex-direction: column;
						height: 100%;
						@include center;
						span:nth-child(1) {
							font-size: 22px;
						}
						span:nth-child(2) {
							font-size: 17px;
							margin-top: 10px;
							color: #7e7e7e;
						}
						span:nth-child(3) {
							font-size: 17px;
							color: #7e7e7e;
						}
					}
					.week-body-course {
						font-size: 18px;
						font-weight: 700;
						width: 90%;
						height: 90%;
						border-radius: 10px;
						@include center;
					}
				}
				.week-body-item:nth-child(1) {
					max-width: 55px;
				}
			}
			.week-body:last-child {
				border-bottom: #ebebeb 1px solid;
			}
		}
	}
}
</style>
