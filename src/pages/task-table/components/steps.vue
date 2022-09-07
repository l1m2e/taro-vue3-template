<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
type State = 'unfinished' | 'ongoing' | 'completed'
const props = withDefaults(
	defineProps<{
		activate?: State
		end?: boolean
		data: any
	}>(),
	{
		activate: 'unfinished',
		end: false
	}
)

const stateText = computed(() => {
	let temp = ''
	switch (props.activate) {
		case 'completed':
			temp = '已完成'
			break
		case 'ongoing':
			temp = '进行中'
			break
		case 'unfinished':
			temp = '未开始'
			break
	}
	return temp
})
const icon = computed(() => {
	let temp = 'success'
	switch (props.activate) {
		case 'completed':
			temp = 'success'
			break
		case 'ongoing':
			temp = 'more-x'
			break
		case 'unfinished':
			temp = 'clock'
			break
	}
	return temp
})
const startTime = dayjs(parseInt(props.data.startTime)).format('HH:mm')
const endTime = dayjs(parseInt(props.data.endTime)).format('HH:mm')
</script>

<template>
	<div class="steps">
		<div class="time">
			<div class="start">{{ startTime }}</div>
			<div class="end">{{ endTime }}</div>
		</div>
		<div class="line-box">
			<nut-icon
				:name="activate === 'ongoing' ? 'check-checked' : 'check-normal'"
				:class="activate === 'ongoing' ? 'round-activate' : 'round'"
				color="#7f86ff"
			></nut-icon>
			<div class="line" v-if="!end"></div>
		</div>
		<div class="steps-content">
			<div :class="`steps-content-card-${activate}`">
				<div class="steps-title">
					<nut-icon size="18" :name="icon"></nut-icon>
					<span>{{ stateText }}</span>
				</div>
				<div class="steps-text-box">
					<div class="course">{{ data.courseName }}</div>
					<div class="steps-location">
						<div class="steps-location-box">
							<div class="steps-location-icon"><nut-icon name="location2" size="14"></nut-icon></div>
							<span class="steps-location-text">教学楼-1011</span>
						</div>
						<div class="steps-location-box">
							<div class="steps-location-icon"><nut-icon name="my2" size="14"></nut-icon></div>
							<span class="steps-location-text">老师</span>
						</div>
					</div>
				</div>
				<!-- <div class="location"><span>教学楼A栋</span></div> -->
				<!-- <div class="classroom"><nut-icon name="location2" size="12"></nut-icon> <span>&nbsp;101</span></div> -->
				<!-- <div class="teacherName"><nut-icon name="my2" size="12"></nut-icon><span>&nbsp;杨老师</span></div> -->
				<!-- <span class="state">{{ stateText }}</span> -->
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.steps {
	width: 100%;
	height: 300px;
	display: flex;
	.time {
		width: 80px;
		height: 100%;
		.start {
			font-size: 30px;
		}
		.end {
			font-size: 25px;
			margin-top: 10px;
			color: #999999;
		}
	}
	.line-box {
		width: 100px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.round {
			font-size: 20px;
			font-weight: 900;
		}
		.round-activate {
			font-size: 30px;
			margin-bottom: 8px;
			margin-top: 8px;
		}
		.line {
			width: 1px;
			border-right: 1px solid #7f86ff;
			height: 100%;
			background-color: #7f86ff;
		}
	}
	.steps-content {
		height: 100%;
		width: 100%;
		@mixin steps-content-card($color, $shadow) {
			position: relative;
			width: 100%;
			height: 90%;
			box-sizing: border-box;
			border-radius: 15px;
			color: white;
			overflow: hidden;
			background-color: white;
			box-shadow: 0px 12px 40px 0px $shadow;
		}
		@mixin steps-title($color) {
			width: 100%;
			height: 70px;
			@include center;
			justify-content: flex-start;
			color: white;
			padding: 0 20px;
			background-color: $color;
			span {
				margin-left: 20px;
			}
		}
		@mixin steps-location($icon, $bg) {
			width: 100%;
			height: 100px;
			@include center;
			margin-top: 10px;
			justify-content: space-between;
			.steps-location-box {
				flex: 1;
				height: 100%;
				@include center;
				justify-content: flex-start;
				.steps-location-text {
					font-size: 26px;
				}
				.steps-location-icon {
					width: 55px;
					height: 55px;
					background-color: $bg;
					margin-right: 20px;
					border-radius: 10px;
					@include center;
					color: $icon;
				}
			}
		}
		.steps-content-card-ongoing {
			@include steps-content-card(#7f86ff, #7f85ff30);
			.steps-title {
				@include steps-title(#7f86ff);
			}
			.steps-location {
				@include steps-location(#7f86ff, #7f85ff7e);
			}
		}
		.steps-content-card-unfinished {
			@include steps-content-card(#ffbd69, #ffbe691e);
			.steps-title {
				@include steps-title(#ffbd69);
			}
			.steps-location {
				@include steps-location(#ffbd69, #ffbd697e);
			}
		}
		.steps-content-card-completed {
			@include steps-content-card(#49b583, #49b58330);
			.steps-title {
				@include steps-title(#49b583);
			}
			.steps-location {
				@include steps-location(#49b583, #49b5837e);
			}
		}
		.steps-text-box {
			width: 100%;
			height: calc(100% - 70px);
			background-color: white;
			color: black;
			box-sizing: border-box;
			padding: 30px;
			.course {
				font-size: 34px;
				font-weight: 600px;
			}
		}
	}
}
</style>
