<script lang="ts" setup>
import todaySelect from '@/components/select-day/index.vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import steps from './components/steps.vue'
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
const num = ref(dayjs().day())
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
				<swiper-item class="swiper-item">
					<div>
						<nut-steps direction="vertical" progress-dot current="2">
							<nut-step title="已完成" content="您的订单已经打包完成，商品已发出">2</nut-step>
							<nut-step title="进行中" content="您的订单正在配送途中">1</nut-step>
							<nut-step title="未开始">
								3
								<template v-slot:content>
									<p>收货地址为：</p>
									<p>北京市经济技术开发区科创十一街18号院京东大厦</p>
								</template>
							</nut-step>
						</nut-steps>
					</div>
				</swiper-item>
				<swiper-item class="swiper-item">
					<div class="content">
						<steps :activate="true"></steps>
						<steps :end="true"></steps>
						<!-- <nut-steps direction="vertical" progress-dot current="1">
							<nut-step title="09:17-10:02">
								<template v-slot:content>
									<div class="card"></div>
								</template>
							</nut-step>
							<nut-step title="已完成">
								<template v-slot:content>
									<div class="card"></div>
								</template>
							</nut-step>
							<nut-step title="已完成">
								<template v-slot:content>
									<div class="card"></div>
								</template>
							</nut-step>
							<nut-step title="已完成">
								<template v-slot:content>
									<div class="card"></div>
								</template>
							</nut-step>
							<nut-step title="已完成">
								<template v-slot:content>
									<div class="card"></div>
								</template>
							</nut-step>
							<nut-step title="已完成">
								<template v-slot:content>
									<div class="card"></div>
								</template>
							</nut-step>
						</nut-steps> -->
					</div>
				</swiper-item>
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
}
</style>
