<script lang="ts" setup>
import Taro from '@tarojs/taro'
definePageConfig({
	navigationBarTitleText: '首页'
})
// const login = () => {
// 	Taro.navigateTo({
// 		url: '/pages/login/index'
// 	})
// }
</script>

<template>
	<div>
		<nut-button
			type="info"
			@click="
				Taro.navigateTo({
					url: '/pages/login/index'
				})
			"
			>点击我授权登录</nut-button
		>
	</div>
</template>

<style lang="scss"></style>
