<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref, onBeforeUnmount } from 'vue'
import todaySelect from '@/components/select-day/index.vue'
import steps from './components/steps.vue'
import { getWeekCourseApi, getformatWeekApi } from '@/api'
import { changeTextToCN } from '@/utils/changeTextToCN'
import getNowWeek from '@/utils/getNowWeek'
definePageConfig({
	navigationBarTitleText: '课程表',
	navigationBarBackgroundColor: '#fafafa'
})
//日视图
const swiperChange = (e: any) => {
	console.log(e.detail.current)
	num.value = e.detail.current
}
const getIndex = (e: number) => {
	console.log('获取index', e)
	num.value = e
}
const num = ref(dayjs().day() === 0 ? 6 : dayjs().day() - 1)
const month = dayjs().format('YYYY-MM')
const weekList = ref()
const week = ref()
const getWeekCourse = async () => {
	const param = {
		className: '班级名称1',
		time: dayjs().format('YYYY-MM-DD'),
		interfaceNum: '45-2'
	}
	const { data: res } = await getWeekCourseApi(param)
	weekList.value = res.weekCourse
	week.value = changeTextToCN(res.weekNum)
	setWeekCourse()
	console.log(res)
}
const setWeekCourse = () => {
	try {
		weekList.value.forEach((item: any) => {
			let now: any = +dayjs()
			item.forEach((e: any) => {
				if (now < e.endTime) {
					if (now > e.startTime) {
						e.activate = 'ongoing'
					} else {
						e.activate = 'unfinished'
					}
				} else {
					e.activate = 'completed'
				}
			})
		})
	} catch (error) {
		console.log('接口炸了')
	}
}
getWeekCourse()
const timeOut = setInterval(() => {
	setWeekCourse()
}, 1000)
onBeforeUnmount(() => {
	clearInterval(timeOut)
})
const date = ref(dayjs().format('YYYY-MM-DD'))
const viewSwitch = ref(false)
const weekDateArr = getNowWeek(date.value)
//周视图
// const colorArr = [
// 	{ backgroundColor: '#ccc', textColor: '#49b583' },
// 	{ backgroundColor: '#ccc', textColor: '#ff4171' },
// 	{ backgroundColor: '#ccc', textColor: '#e85ec0' },
// 	{ backgroundColor: '#ccc', textColor: '#ffbd69' },
// 	{ backgroundColor: '#ccc', textColor: '#2c68ff' }
// ]
const weekListFormat = ref()
const getFormatWeek = async () => {
	const param = {
		className: '班级名称1',
		time: dayjs().format('YYYY-MM-DD'),
		interfaceNum: '45-4'
	}
	const { data: res } = await getformatWeekApi(param)
	weekListFormat.value = res
	// let flag = true
	// let tempArr = []
	// weekListFormat.value.forEach(item => {
	// 	item.forEach(element => {
	// 		tempArr.forEach(value => {
	// 			element.name == value.name || element.name === '' ? (flag = false) : ''
	// 		})
	// 	})
	// })
}
getFormatWeek()
</script>

<template>
	<div class="task">
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
					<span class="week-title-text">周{{ item.week }}</span>
					<span class="week-title-date">{{ dayjs(item.date).format('MM/DD') }}</span>
				</div>
			</div>
			<div class="week-body" v-for="(item, index) in weekListFormat">
				<div class="week-body-item" v-for="(v, i) in item">
					<div v-if="i === 0" class="week-body-index">
						<span>{{ index + 1 }}</span>
						<span>{{ v.startTime }}</span>
						<span>{{ v.startTime }}</span>
					</div>
					<div v-else class="week-body-course">{{ v.name }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
page {
	background-color: #fafafa;
}
.task {
	.title {
		width: 100%;
		height: 200px;
		box-sizing: border-box;
		// background-color: red;
		display: flex;
		padding: 0 40px;
		.left,
		.right {
			flex: 1;
		}
		.right {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			div {
				width: 80%;
				height: 100px;
				background-color: #49b583;
				border-radius: 30px;
				@include center;
				color: white;
				box-shadow: 0px 20px 40px #49b58351;
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
				box-shadow: 0px 20px 40px #7f85ff51;
			}
		}
		.left {
			display: flex;
			justify-content: center;
			flex-direction: column;
			.item1 {
				color: #7e7e7e;
			}
			.item2 {
				font-size: 45px;
			}
		}
	}
	.task-today {
		width: 700%;
		height: calc(100vh - 200px - 120px);
		overflow: hidden;
		swiper {
			height: 100%;
			.swiper-item {
				overflow-y: auto;
				.content {
					width: 100vw;
					box-sizing: border-box;
					padding: 40px;
					.card {
						width: 600px;
						height: 200px;
						border-radius: 25px;
						background-color: #7f86ff;
						margin-bottom: 30px;
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
				height: 50px;
				@include center;
				flex-direction: column;
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
		.week-body {
			display: flex;
			.week-body-item {
				flex: 1;
				border-left: 1px solid #ebebeb;
				border-top: 1px solid #ebebeb;
				height: 115px;
				@include center;
				.week-body-index {
					@include center;
					height: 100%;
					flex-direction: column;
					span:nth-child(1) {
						font-size: 22px;
					}
					span:nth-child(2) {
						margin-top: 10px;
						font-size: 17px;
						color: #7e7e7e;
					}
					span:nth-child(3) {
						font-size: 17px;
						color: #7e7e7e;
					}
				}
				.week-body-course {
					width: 90%;
					height: 90%;
					background-color: #49b58320;
					font-size: 20px;
					@include center;
					border-radius: 10px;
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
</style>
