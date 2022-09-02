<script lang="ts" setup>
import divday from '@/components/select-day/index.vue'
// import Taro, { useDidShow } from '@tarojs/taro'
// import useSilentLogin from '@/hook/useSilentLogin'
definePageConfig({
	navigationBarTitleText: '首页'
})
</script>

<template>
	<div class="home">
		<nut-button type="info">打开课程表</nut-button>
		<divday></divday>
	</div>
</template>

<style lang="scss"></style>
