<template>
	<div class="tab-bar">
		<div class="tab-bar-item" v-for="(item, index) in list" :key="index" @tap="switchTab(index, item.pagePath)">
			<image v-show="selected === index" :src="item.selectedIconPath"></image>
			<image v-show="selected !== index" :src="item.iconPath"></image>
			<div :style="{ color: selected === index ? selectedColor : color }">{{ item.text }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { selected } from '@/store/tab-bar'

const color = '#000000'
const selectedColor = '#7a7af9'
const list = ref([
	{
		pagePath: '/pages/course/index',
		iconPath: '../assets/tab-bar/course.png',
		selectedIconPath: '../assets/tab-bar/course-active.png',
		text: '课程'
	},
	{
		pagePath: '/pages/task-table/index',
		iconPath: '../assets/tab-bar/task.png',
		selectedIconPath: '../assets/tab-bar/task-active.png',
		text: '课程表'
	},
	{
		pagePath: '/pages/rent-classroom/index',
		iconPath: '../assets/tab-bar/rent.png',
		selectedIconPath: '../assets/tab-bar/rent-active.png',
		text: '借用'
	},
	{
		pagePath: '/pages/user/index',
		iconPath: '../assets/tab-bar/user.png',
		selectedIconPath: '../assets/tab-bar/user-active.png',
		text: '我的'
	}
])
function switchTab(index: number, url: string) {
	selected.value = index
	Taro.switchTab({ url })
}
</script>

<style lang="scss">
.tab-bar {
	position: fixed;
	bottom: 0px;
	left: 0;
	right: 0;
	height: 110px;
	background: #fafafacc;
	backdrop-filter: saturate(180%) blur(20px);
	display: flex;
	width: 100%;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 15px;
}
.tab-bar-item {
	flex: 1;
	@include center;
	flex-direction: column;
	image {
		width: 50px;
		height: 50px;
	}
	div {
		margin-top: 5px;
		font-size: 18px;
	}
}
</style>
