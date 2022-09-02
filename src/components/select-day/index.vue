<script setup lang="ts">
import getNowWeek from '@/utils/getNowWeek'
import { ref } from 'vue'
import dayjs from 'dayjs'
const weekList = getNowWeek()
const now = ref(dayjs().format('YYYY-MM-DD'))
</script>
<template>
	<div class="select-day">
		<div :class="item.date === now ? 'item onclick' : 'item'" v-for="item in weekList">
			<div class="week">{{ item.week }}</div>
			<div class="date">{{ item.date.substring(8) }}</div>
		</div>
	</div>
</template>
<style lang="scss">
.select-day {
	width: 100%;
	height: 120px;
	box-sizing: border-box;
	padding: 0px 20px 0 20px;
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
	.onclick {
		border-bottom: 6px #48b583 solid;
		div {
			color: #48b583 !important;
		}
	}
}
</style>
