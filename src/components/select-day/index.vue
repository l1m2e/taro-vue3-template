<script setup lang="ts">
import getNowWeek from '@/utils/getNowWeek'
import { ref } from 'vue'
import Taro, { useReady } from '@tarojs/taro'
import dayjs from 'dayjs'
const weekList = getNowWeek()
const now = ref(dayjs().format('YYYY-MM-DD'))
const lineLeft = ref()
let weekNum = dayjs().day()
function fn(date: any, e: any) {
	lineLeft.value = `${e.offsetLeft}px`
	now.value = date
	console.log(now.value)
}
const flag = ref(false)
useReady(() => {
	Taro.createSelectorQuery()
		.selectAll('.item')
		.boundingClientRect(function(rects) {
			lineLeft.value = rects[weekNum].left + 'px'
			flag.value = true
		})
		.exec()
})
</script>
<template>
	<div class="select-day">
		<div :class="item.date === now ? 'item onclick' : 'item'" @click="fn(item.date, $event.target)" v-for="item in weekList">
			<div class="week">{{ item.week }}</div>
			<div class="date">{{ item.date.substring(8) }}</div>
		</div>
		<div class="line" v-if="flag"></div>
	</div>
</template>
<style lang="scss">
.select-day {
	width: 100%;
	height: 120px;
	box-sizing: border-box;
	padding: 0px 20px 0 20px;
	position: relative;

	@include center;
	.item {
		flex: 1;
		height: 100px;
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-left: 5px;
		margin-right: 5px;
		.week {
			width: 100%;
			height: 30px;
			font-size: 25px;
			text-align: center;
			color: #999999;
			margin-top: 5px;
		}
		.date {
			margin-top: 15px;
			font-size: 34px;
			width: 100%;
			text-align: center;
		}
	}
	.line {
		transition: all 0.6s;
		position: absolute;
		bottom: 0px;
		left: v-bind(lineLeft);
		width: 95px;
		height: 7px;
		border-radius: 50px;
		background-color: #48b583;
	}
	.onclick {
		div {
			color: #48b583 !important;
		}
	}
}
</style>
