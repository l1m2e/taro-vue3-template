<script lang="ts" setup>
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
fullScreen()
</script>

<template>
	<live-player model="RTC" :enable-auto-rotation="true" class="w-100vw h-100vh" :src="liveStreamingAddress" :autoplay="true" id="live-player" />
</template>

<style lang="scss"></style>
