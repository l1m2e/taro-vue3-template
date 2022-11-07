<script lang="ts" setup>
import { useSchoolInfo } from '@/composables'
import { socket } from '@/services/scoket.io'
console.log('[ socket ] >', socket)
if (useSchoolInfo.value.innerURL === '') {
	Taro.navigateTo({
		url: '/pages/user/components/bindSchool'
	})
}
function fn() {
	Taro.navigateTo({
		url: '/pages/task-table/index'
	})
}
function fn2() {
	Taro.navigateTo({
		url: '/pages/sign-in/index'
	})
}
function fn3() {
	Taro.navigateTo({
		url: '/pages/rent-classroom/index'
	})
}
function fn4() {
	Taro.navigateTo({
		url: '/pages/live/index'
	})
}
definePageConfig({
	navigationBarTitleText: '首页',
	navigationBarBackgroundColor: '#fafafa'
})
// 打开调试
// Taro.setEnableDebug({
// 	enableDebug: true
// })
</script>

<template>
	<div class="home">
		<div class="btn-success" type="info" @click="fn">课程表</div>
		<div class="btn-success" type="info" @click="fn2">签到</div>
		<div class="btn-success" type="info" @click="fn3">借用</div>
		<div class="btn-success" type="info" @click="fn4">直播</div>
		<!-- <div>{{ useSchoolInfo?.innerURL }}</div> -->
	</div>
</template>

<style lang="scss"></style>
