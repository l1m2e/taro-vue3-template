<script lang="ts" setup>
defineProps<{
	activate?: boolean
	end?: boolean
}>()
</script>

<template>
	<div class="steps">
		<div class="time">
			<div class="start">09:30</div>
			<div class="end">10:30</div>
		</div>
		<div class="line-box">
			<nut-icon
				:name="activate ? 'check-checked' : 'check-normal'"
				:class="activate ? 'round-activate' : 'round'"
				color="#7f86ff"
			></nut-icon>
			<div class="line" v-if="!end"></div>
		</div>
		<div class="steps-content">
			<div :class="activate ? 'steps-content-card-activate' : 'steps-content-card'">
				<div class="course">JavaScript程序设计</div>
				<div class="location"><span>教学楼A栋</span></div>
				<div class="classroom"><nut-icon name="location2" size="12"></nut-icon> <span>&nbsp;101</span></div>
				<div class="teacherName"><nut-icon name="my2" size="12"></nut-icon><span>&nbsp;杨老师</span></div>
				<span class="state">上课中</span>
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
		background-color: white;
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
		.steps-content-card-activate {
			position: relative;
			width: 100%;
			height: 90%;
			padding: 40px;
			box-sizing: border-box;
			border-radius: 25px;
			background-color: #7f86ff;
			box-shadow: 0px 12px 24px 0px #7f86ff4d;
			color: white;
		}
		.steps-content-card {
			position: relative;
			padding: 40px;
			box-sizing: border-box;
			width: 100%;
			height: 90%;
			border-radius: 25px;
			background-color: #e9fffe;
		}
		.state {
			color: #545ceb;
			position: absolute;
			bottom: 60px;
			right: 30px;
			font-size: 50px;
			transform: rotate(-30deg);
		}
		.course {
			font-size: 32px;
		}
		.location {
			margin-top: 10px;
			font-size: 26px;
			@include center;
			justify-content: flex-start;
		}
		.classroom {
			margin-top: 10px;
			font-size: 26px;
			@include center;
			justify-content: flex-start;
		}
		.teacherName {
			margin-top: 30px;
			font-size: 26px;
			@include center;
			justify-content: flex-start;
		}
	}
}
</style>
