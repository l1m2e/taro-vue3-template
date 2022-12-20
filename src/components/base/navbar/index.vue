<script lang="ts" setup>
const titleHeight = ref<string | number>('0px')
const titleTop = ref('0px')
const TextHeight = ref('0px')
const useNavBarHeight = () => {
	const { statusBarHeight } = Taro.getSystemInfoSync()
	if (statusBarHeight) {
		const { height, top } = Taro.getMenuButtonBoundingClientRect()
		titleHeight.value = height + statusBarHeight + 10 + 'px'
		titleTop.value = top + 'px'
		TextHeight.value = height + 'px'
	} else {
		console.log('获取不到高度')
	}
}
useNavBarHeight()
const bark = () => {
	Taro.navigateBack({ delta: 1 })
}
</script>

<template>
	<div class="navbar">
		<div class="title-text" @click="bark">
			<div class="i-ri-arrow-left-s-line"></div>
			<div>考勤记录</div>
		</div>
	</div>
	<div class="box"></div>
</template>

<style lang="scss">
.navbar {
	width: 100vw;
	height: v-bind(titleHeight);
	position: fixed;
	top: 0;
	background: #fafafacc;
	backdrop-filter: saturate(180%) blur(20px);
	z-index: 98;
}
.title-text {
	position: fixed;
	top: v-bind(titleTop);
	height: v-bind(TextHeight);
	width: 50%;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding-left: 10px;
	font-size: 34px;
}
.box {
	width: 100%;
	height: 0;
	margin-top: v-bind(titleHeight);
}
</style>
