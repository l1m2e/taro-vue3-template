<script lang="ts" setup>
import Taro from '@tarojs/taro'

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
definePageConfig({
	navigationBarTitleText: '首页',
	navigationBarBackgroundColor: '#fafafa'
})
</script>

<template>
	<div class="home">
		<nut-button type="info" @click="fn">打开课程表</nut-button>
		<nut-button type="info" @click="fn2">打开签到</nut-button>
		<nut-button type="info" @click="fn3">打开借用</nut-button>
	</div>
</template>

<style lang="scss"></style>
