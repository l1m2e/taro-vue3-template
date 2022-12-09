<script lang="ts" setup>
import dayjs from 'dayjs'
definePageConfig({
	navigationBarTitleText: '签到',
	navigationBarBackgroundColor: '#fafafa'
})
const signList = ref<any[]>([])
const getSignList = async () => {
	const res = await api.getSignList({ time: dayjs().valueOf() })
	if (res.statusCode === 200) {
		signList.value = res.data
	}
	if (res.statusCode === 400) {
		// 显示没课页面
	}
}
getSignList()
</script>
<template>
	<div>
		<div class="card" v-for="item in signList">
			<div class="text-title">{{ item }}</div>
			<div class="text-body">12:00 ~ 13:00</div>
			<div class="text-body">还有 30 分钟签到结束</div>
			<div class="teacher">杨老师</div>
			<span class="bg-blue-400 color-white active:bg-blue-600 button" type="info">签到</span>
		</div>
	</div>
</template>

<style lang="scss">
.card {
	width: 90vw;
	height: 230px;
	margin: 30px auto;
	border-radius: 35px;
	background-color: #e2f3ff;
	padding: 30px;
	box-sizing: border-box;
	position: relative;
	& > .text-title {
		width: 100%;
		font-size: 35px;
		padding-bottom: 15px;
	}
	& > .text-body {
		width: 100%;
		margin-top: 20px;
		font-size: 30px;
		color: #626c72;
	}
	& > .teacher {
		position: absolute;
		top: 0;
		right: 0;
		background-color: #2da7fa;
		border-radius: 0px 35px 0 35px;
		box-sizing: border-box;
		padding: 15px 25px;
		color: white;
	}
	& > .button {
		position: absolute;
		top: 110px;
		right: 50px;
		border-radius: 20px;
		padding: 25px 50px;
		box-sizing: border-box;
	}
}
</style>
