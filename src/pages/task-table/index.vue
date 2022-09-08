<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref, onBeforeUnmount } from 'vue'
import todaySelect from '@/components/select-day/index.vue'
import steps from './components/steps.vue'
import { getWeekCourseApi } from '@/api'
import { changeTextToCN } from '@/utils/changeTextToCN'
import getNowWeek from '@/utils/getNowWeek'
definePageConfig({
	navigationBarTitleText: '课程表',
	navigationBarBackgroundColor: '#fafafa'
})
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
	console.log(weekList.value)
}
const setWeekCourse = () => {
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
				max-width: 40px;
			}
		}
	}
}
</style>
