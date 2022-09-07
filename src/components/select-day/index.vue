<script setup lang="ts">
import getNowWeek from '@/utils/getNowWeek'
import { ref, watch } from 'vue'
import Taro, { useReady } from '@tarojs/taro'
import dayjs from 'dayjs'

const props = defineProps(['swiperIndex'])
const emit = defineEmits(['index'])

const weekList = getNowWeek()
const now = ref(dayjs().format('YYYY-MM-DD'))
const lineLeft = ref()
// let weekNum = dayjs().day()
const flag = ref(false)

const onDay = (date: any, e: any, index: number) => {
	lineLeft.value = `${e.target.offsetLeft}px`
	now.value = date
	emit('index', index)
}
useReady(() => {
	flag.value = true
})
watch(
	() => props.swiperIndex,
	v => {
		now.value = weekList[v].date
		Taro.createSelectorQuery()
			.selectAll('.item')
			.boundingClientRect(function(rects) {
				lineLeft.value = rects[v].left + 'px'
				flag.value = true
			})
			.exec()
	}
)
</script>
<template>
	<div class="select-day">
		<div
			:class="item.date === now ? 'item onclick' : 'item'"
			v-for="(item, index) in weekList"
			key="item.date"
			@click="onDay(item.date, $event, index)"
		>
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
		margin: 0 20px;
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
		bottom: 10px;
		left: v-bind(lineLeft);
		width: 62px;
		height: 4px;
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
