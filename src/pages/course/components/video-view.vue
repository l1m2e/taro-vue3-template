<script lang="ts" setup>
import { LivePlayer } from '@tarojs/components'

definePageConfig({
	navigationBarTitleText: '课程直播',
	navigationBarBackgroundColor: '#fafafa'
})
const liveStreamingAddress = Taro.getCurrentInstance().router?.params.link
const fullScreen = () => {
	let player = Taro.createLivePlayerContext('live-player')
	player.requestFullScreen({
		direction: 90
	})
}
const fn = (e) => {
	console.log('e', e)
}
const controlFieldShow = ref(false)
let controlFieldTimeIndex = 0
const onControlField = () => {
	clearTimeout(controlFieldTimeIndex)
	controlFieldShow.value = true
	controlFieldTimeIndex = setTimeout(() => {
		controlFieldShow.value = false
	}, 3000)
}
</script>

<template>
	<live-player model="RTC" :enable-auto-rotation="true" class="w-100vw h-250px relative" :src="liveStreamingAddress" :autoplay="true" id="live-player" @fullScreenChange="fn">
		<div class="w-100% h-100%" @click="onControlField">
			<div v-if="controlFieldShow" class="w-100% h-30px box-border bg-#0000003b  absolute bottom-0 flex items-center justify-end px-15px color-white text-white">
				<div class="i-ri-fullscreen-line w-24px h-24px" @click="fullScreen()"></div>
			</div>
		</div>
	</live-player>
</template>

<style lang="scss"></style>
