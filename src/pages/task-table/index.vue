<script lang="ts" setup>
import todaySelect from '@/components/select-day/index.vue'
import { ref } from 'vue'
definePageConfig({
	navigationBarTitleText: '课程表'
})

const swiperChange = e => {
	console.log(e.detail.current)
	num.value = e.detail.current
}
const fn = e => {
	console.log('获取index', e)
	num.value = e
}
const num = ref(0)
</script>

<template>
	<div class="task">
		<div class="title">
			<div class="left">
				<span class="item1">2022-06</span>
				<span class="item2">十一周</span>
			</div>
			<div class="right">
				<div>
					<image :src="require('../../assets/icon/switch.svg')"></image>
					&nbsp;
					<span>周视图</span>
				</div>
			</div>
		</div>
		<todaySelect @index="fn" :swiperIndex="num"></todaySelect>
		<div class="task-today">
			<swiper :current="num" @change="swiperChange">
				<swiper-item>0</swiper-item>
				<swiper-item>1</swiper-item>
				<swiper-item>2</swiper-item>
				<swiper-item>3</swiper-item>
				<swiper-item>4</swiper-item>
				<swiper-item>5</swiper-item>
				<swiper-item>6</swiper-item>
			</swiper>
		</div>
	</div>
</template>

<style lang="scss">
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
				box-shadow: 0px 20px 40px #49b58376;
				image {
					width: 42px;
					height: 42px;
				}
				span {
					font-size: 32px;
				}
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
		swiper {
			// background-color: #49b583;
			height: 100%;
		}
	}
}
</style>
