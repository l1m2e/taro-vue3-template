<script lang="ts" setup>
import { useLoad } from '@tarojs/taro'
import { useUserInfo, useIsBindUserInfo } from '@/composables'
import empty from '@/components/empty-page/index.vue'
definePageConfig({
	navigationBarTitleText: '授权登录',
	navigationBarBackgroundColor: '#fafafa'
})
// @ts-ignore
useLoad((query: any) => {
	const scene = decodeURIComponent(query.scene)
	sceneref.value = scene
})

// 授权登录
const authorizedLogin = async () => {
	const res = await api.webCMSLogin(sceneref.value)
	if (res.statusCode === 200) {
		Taro.showToast({ title: '登录成功', icon: 'success', duration: 2000 })
	} else {
		Taro.showToast({ title: '登录失败', icon: 'error', duration: 2000 })
	}
}

// 跳转到用户界面
const goToUser = () => {
	Taro.switchTab({ url: '/pages/user/index' })
}
const sceneref = ref()
</script>

<template>
	<div class="px-10px relative h-100vh">
		<div v-if="useIsBindUserInfo">
			<div class="h-200px center flex-col">
				<image class="w-100px h-100px rounded-full" :src="useUserInfo.avatarUrl" />
				<text class="mt-20px  text-18px">{{ useUserInfo.studentName }}</text>
			</div>
			<p class="font-500 text-22px text-center ">授权登录备课系统</p>
			<div></div>
			<div class="px-10px absolute bottom-100px left-0 w-100vw box-border">
				<div class="btn-success m-auto w-100%  center box-border rounded-full h-45px tracking-widest text-19px" @click="authorizedLogin">登录</div>
			</div>
			<p class="bg-red">{{ sceneref }}</p>
		</div>
		<div v-else>
			<empty :img="Svg.state403" text="您无权访问 请先登录绑定信息后后重新扫码"></empty>
			<div class="btn-success m-auto w-80%  mt-100px  center box-border rounded-full h-40px tracking-widest text-17px" @click="goToUser">去登录</div>
		</div>
	</div>
</template>

<style lang="scss"></style>
