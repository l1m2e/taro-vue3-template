<script lang="ts" setup>
import Taro from '@tarojs/taro'
definePageConfig({
	navigationBarTitleText: '授权'
})
Taro.login({
	success(res) {
		if (res.code) {
			//发起网络请求
			console.log(res.code)
		} else {
			console.log('登录失败！' + res.errMsg)
		}
	}
})

const getUserInfo = () => {
	Taro.getUserProfile({
		desc: '用于完善用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		success: res => {
			Taro.setStorageSync('userName', res.userInfo.nickName)
			Taro.setStorageSync('sex', res.userInfo.gender)
			Taro.setStorageSync('buddha', res.userInfo.avatarUrl)
		}
	})
}
</script>

<template>
	<div>
		<div class="icon"><image class="icon-img" src="../../assets/tab-bar/home-active.png" /></div>
		<div>
			<p class="h1">hello，欢迎使用莱拓智能</p>
			<p class="h1">莱托智能需要你的授权</p>
			<p class="h2">莱拓智能不会将你的信息提供给第三方</p>
		</div>
		<div class="button">
			<nut-button block type="info" @click="getUserInfo" size="large">授权</nut-button>
		</div>
	</div>
</template>

<style lang="scss">
.h1 {
	font-size: 40px;
	font-weight: 700;
	text-align: center;
	margin-top: 30px;
}
.h2 {
	font-size: 30px;
	color: #c6c8ce;
	text-align: center;
	margin-top: 100px;
}
.icon {
	width: 100%;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.icon-img {
	width: 200px;
	height: 200px;
	border-radius: 100%;
}
.button {
	width: 80%;
	margin: 0 auto;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
