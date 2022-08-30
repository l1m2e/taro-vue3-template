<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { reactive } from 'vue'
import { getUserInfoApi } from '@/api'
import useSilentLogin from '@/hook/useSilentLogin'
definePageConfig({
	navigationBarTitleText: '授权'
})

const msg = reactive({
	show: false,
	desc: '',
	type: 'primary'
})
const NUmessage = (type: string = 'primary', desc: string = '成功') => {
	msg.desc = desc
	msg.type = type
	msg.show = true
}
const getUserInfo = () => {
	Taro.getUserProfile({
		desc: '用于完善用户信息',
		success: async e => {
			Taro.setStorageSync('userName', e.userInfo.nickName)
			Taro.setStorageSync('sex', e.userInfo.gender)
			Taro.setStorageSync('buddha', e.userInfo.avatarUrl)
			const parmas = {
				sessionKey: Taro.getStorageSync('sessionKey'),
				encryptedData: e.encryptedData,
				iv: e.iv,
				openid: Taro.getStorageSync('openid')
			}
			const { data: res, statusCode } = await getUserInfoApi(parmas)
			if (statusCode === 200) {
				NUmessage('success', res.messages)
				Taro.navigateTo({
					url: '/pages/login/bindPhone/index'
				})
			} else {
				NUmessage('danger', '授权失败')
			}
			if (statusCode === 400) {
				useSilentLogin(false)
				NUmessage('danger', '会话过期，请重新授权')
			}
		},
		fail: () => {
			NUmessage('danger', '使用本程序需要授权')
		}
	})
}
</script>

<template>
	<div>
		<nut-notify v-model:visible="msg.show" :msg="msg.desc" :type="msg.type" />
		<div class="icon"><image class="icon-img" src="@/assets/tab-bar/home-active.png" /></div>
		<div>
			<p class="h1">你好，欢迎使用莱拓智能</p>
			<p class="h1">莱托智能需要你的授权</p>
			<p class="h2">莱拓智能不会将你的信息提供给第三方</p>
		</div>
		<div class="button">
			<nut-button block type="info" @click="getUserInfo" size="large">
				授权
			</nut-button>
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
