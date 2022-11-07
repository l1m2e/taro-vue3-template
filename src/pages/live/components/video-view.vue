<script lang="ts" setup>
definePageConfig({
	navigationBarTitleText: '观看直播',
	navigationBarBackgroundColor: '#fafafa'
})
const liveStreamingAddress = Taro.getCurrentInstance().router?.params.link
console.log('[  ] >', liveStreamingAddress)
</script>

<template>
	<live-player class="w-100%" :src="liveStreamingAddress" :autoplay="true" />
</template>

<style lang="scss"></style>
