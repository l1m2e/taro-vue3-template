<script lang="ts" setup>
import divday from '@/components/select-day/index.vue'
import Taro from '@tarojs/taro'
function fn() {
	Taro.navigateTo({
		url: '/pages/task-table/index'
	})
}
definePageConfig({
	navigationBarTitleText: '首页'
})
</script>

<template>
	<div class="home">
		<nut-button type="info" @click="fn">打开课程表</nut-button>
		<divday></divday>
	</div>
</template>

<style lang="scss"></style>
