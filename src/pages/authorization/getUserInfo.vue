<script lang="ts" setup>
import Svg from '@/assets/img/image'
import { useWeChatUserInfo } from '@/composables'
definePageConfig({
	navigationBarTitleText: '授权',
	navigationBarBackgroundColor: '#fafafa'
})
</script>

<template>
	<div class="center flex-col px-20px">
		<img :src="Svg.logo" class="w-150px h-150px mt-100px" />
		<div class="mt-40px text-20px">欢迎使用智能校园小程序</div>
		<div class="mt-20px text-17px">智能校园小程序需要您的授权</div>
		<div class="mt-20px text-14px color-gray">我们承诺不会将您的头像用户名信息透露给第三方</div>
		<div class="mt-20px text-14px color-gray">仅作为补充用户信息使用</div>
		<div class="button" @click="useWeChatUserInfo">授权</div>
	</div>
</template>

<style lang="scss">
.button {
	width: 80%;
	height: 100px;
	color: white;
	border-radius: 30px;
	background-color: #49b583;
	box-shadow: 0 20px 40px #49b5832a;
	margin: 200px auto;
	@include center;
}
.button:active {
	background-color: #3c946b;
}
</style>
