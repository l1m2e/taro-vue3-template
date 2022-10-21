<script lang="ts" setup>
import { useLoad } from '@tarojs/taro'
definePageConfig({
	navigationBarTitleText: '授权登录',
	navigationBarBackgroundColor: '#fafafa'
})
useLoad((query): void => {
	const scene = decodeURIComponent(query.scene)
	console.log('[ scene ] >', scene)
	sceneref.value = scene
})
const avatar = Taro.getStorageSync('avatar')
const sceneref = ref()
</script>

<template>
	<div class="px-10px relative h-100vh">
		<div class="h-200px flex justify-center items-center">
			<img class="w-100px h-100px rounded-full" :src="avatar" alt="" />
		</div>
		<p class="font-500 text-24px text-center ">授权登录备课系统</p>
		<div></div>
		<div class="px-10px absolute bottom-100px left-0 w-100vw box-border">
			<div class="btn-success m-auto w-100%  box-border text-center">登录</div>
			<div class="btn-success m-auto w-100%  box-border text-center bg-gray mt-20px">取消</div>
		</div>
		<p class="bg-red">{{ sceneref }}</p>
	</div>
</template>

<style lang="scss"></style>
