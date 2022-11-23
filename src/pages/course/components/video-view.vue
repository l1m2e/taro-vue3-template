<script lang="ts" setup>
import { LivePlayer } from '@tarojs/components'

definePageConfig({
	navigationBarTitleText: '观看直播',
	navigationBarBackgroundColor: '#fafafa'
})
const liveStreamingAddress = Taro.getCurrentInstance().router?.params.link
const fullScreen = () => {
	let player = Taro.createLivePlayerContext('live-player')
	player.requestFullScreen({
		direction: 90
	})
}
</script>

<template>
	<live-player model="RTC" :enable-auto-rotation="true" class="w-100vw h-200px relative" :src="liveStreamingAddress" :autoplay="true" id="live-player">
		<div class="w-100% h-30px box-border bg-black  absolute bottom-0 flex justify-end px-10px color-white text-white">
			<div class="i-ri-fullscreen-line w-25px h-25px" @click="fullScreen()"></div>
		</div>
	</live-player>
</template>

<style lang="scss"></style>
