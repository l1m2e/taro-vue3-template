<script lang="ts" setup>
// import Taro, { useDidShow } from '@tarojs/taro'
// import useSilentLogin from '@/hook/useSilentLogin'
definePageConfig({
	navigationBarTitleText: '首页'
})

// useDidShow(() => {
// 	isAuthorization()
// })

// const isAuthorization = () => {
// 	//判断是否有token 如果没有调起静默登录
// 	const isToken = Taro.getStorageSync('token')
// 	if (!isToken) {
// 		useSilentLogin(true)
// 	}
// }
</script>

<template>
	<div>主页</div>
</template>

<style lang="scss"></style>
